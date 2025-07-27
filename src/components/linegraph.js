
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const LineGraph = ({ data }) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* <h2 style={{ color: '#4A90E2', fontWeight: 'bold' }}>Orders Processed and Pending</h2> */}
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="0 20"  />
        <XAxis 
          dataKey="date" 
          tick={{ fill: '#6a6d7e', fontSize: 12 }} 
          label={{ value: "Date", position: "insideBottom", offset: -5, fill: '#555' }} 
        />
        <YAxis 
          tick={{ fill: '#6a6d7e', fontSize: 12 }} 
          label={{ value: "Orders", angle: -90, position: "insideLeft", fill: '#555' }} 
        />
        <Tooltip 
          contentStyle={{ backgroundColor: '#f4f4f4', border: '1px solid #ddd', borderRadius: '8px' }} 
          itemStyle={{ color: '#6a6d7e' }}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Legend wrapperStyle={{ fontSize: 14, fontWeight: 'bold',marginTop:'5'}} />
        <Line 
          type="monotone" 
          dataKey="products" 
          stroke="#82ca9d" 
          strokeWidth={3} 
          dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4, fill: '#fff' }} 
          activeDot={{ r: 8, stroke: '#82ca9d', fill: '#82ca9d' }} 
          name="Products Processed Today" 
        />
        <Line 
          type="monotone" 
          dataKey="fruits" 
          stroke="#8884d8" 
          strokeWidth={3} 
          dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4, fill: '#fff' }} 
          activeDot={{ r: 8, stroke: '#8884d8', fill: '#8884d8' }} 
          name="Fruits Processed Today" 
        />
      </LineChart>
    </div>
  );
};

export default LineGraph;


