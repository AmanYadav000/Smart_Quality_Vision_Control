from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from ultralytics import YOLO
import cv2
from pyzbar.pyzbar import decode
import numpy as np
import io
from starlette.responses import StreamingResponse
from PIL import Image
import uvicorn

app = FastAPI()

# Load the YOLO model
model = YOLO('/content/barcode.pt')



def detect_blur(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    return laplacian_var < 100  # Threshold for blur detection

def sharpen_image(image):
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    img= cv2.filter2D(image, -1, kernel)
    return img
def detect_contrast(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    min_val, max_val = np.min(gray), np.max(gray)
    return (max_val - min_val) < 50  # Threshold for low contrast

def improve_contrast(image):
    img=cv2.equalizeHist(cv2.cvtColor(image, cv2.COLOR_BGR2GRAY))
    return img
def detect_noise(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    std_dev = np.std(gray)
    return std_dev > 50  # Threshold for noise detection

def denoise_image(image):
    img=cv2.fastNlMeansDenoisingColored(image, None, 30, 30, 7, 21)
    return img
def detect_skew(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    lines = cv2.HoughLines(edges, 1, np.pi/180, 200)
    if lines is not None:
        for rho, theta in lines[0]:
            angle = (theta - np.pi/2) * 180 / np.pi
            return abs(angle) > 5  # Skew threshold (5 degrees)
    return False

def deskew_image(image, angle):
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, angle, 1.0)
    img=cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    return img
def detect_binarization_needed(image):
    # Calculate standard deviation in grayscale; high deviation suggests multi-colored text.
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return np.std(gray) > 70  # Threshold for multi-color or complicated text

def binarize_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    img=cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)[1]
    return img
def preprocess_image(image):
    # Step 1: Check if the image is blurry
    if detect_blur(image):
        #print("Blurry image detected. Applying sharpening.")
        image = sharpen_image(image)

    # Step 2: Check if the image has low contrast
    if detect_contrast(image):
        #print("Low contrast detected. Applying contrast enhancement.")
        image = improve_contrast(image)

    # Step 3: Check if the image is noisy
    if detect_noise(image):
        #print("Noise detected. Applying denoising.")
        image = denoise_image(image)

    # Step 4: Check if the image is skewed
    if detect_skew(image):
        #print("Skew detected. Applying deskewing.")
        image = deskew_image(image, angle=detect_skew_angle(image))

    # Step 5: Check if binarization is needed
    if detect_binarization_needed(image):
        #print("Binarization needed. Applying binarization.")
        image = binarize_image(image)

    return image


# Function to rotate the image by a given angle
def rotate_image(image, angle):
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)

    # Generate a rotation matrix
    M = cv2.getRotationMatrix2D(center, angle, 1.0)

    # Perform the rotation
    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(255, 255, 255))
    return rotated

# Function to decode barcodes from a rotated image
def decode_rotated_barcode(region):
    for angle in range(0, 360, 30):  # Rotate in 30-degree intervals
        rotated_region = rotate_image(region, angle)

        # Convert to grayscale and preprocess
        gray = cv2.cvtColor(rotated_region, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Decode barcodes
        detected_barcodes = decode(thresh)
        if detected_barcodes:
            for barcode in detected_barcodes:
                if barcode.data:
                    return {
                        "data": barcode.data.decode('utf-8'),
                        "type": barcode.type,
                        "angle": angle
                    }
    return None

# API route for barcode detection
@app.post("/detect-barcodes/")
async def detect_barcodes(file: UploadFile = File(...)):
    try:
        # Read the uploaded image file
        file_bytes = await file.read()
        image = np.array(Image.open(io.BytesIO(file_bytes)))

        # Run inference on the image
        results = model(image)

        # Process the results
        response_data = []
        for r in results:
            boxes = r.boxes.xyxy.cpu().numpy()

            for idx, box in enumerate(boxes):
                x1, y1, x2, y2 = map(int, box)
                barcode_region = image[y1:y2, x1:x2]

                # Attempt to decode barcode with rotation
                decoded = decode_rotated_barcode(barcode_region)
                if decoded:
                    response_data.append({
                        "barcode_index": idx + 1,
                        "coordinates": {"x1": x1, "y1": y1, "x2": x2, "y2": y2},
                        "barcode_data": decoded
                    })

        if not response_data:
            return JSONResponse(
                content={"message": "No barcodes were successfully decoded."},
                status_code=404
            )

        return {"detected_barcodes": response_data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Root endpoint
@app.get("/")
def root():
    return {"message": "Barcode Detection API is running. Use /detect-barcodes/ endpoint to detect barcodes."}

# Run the app locally if this script is the main program
if name == "main":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)