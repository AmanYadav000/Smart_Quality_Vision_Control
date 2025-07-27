import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';


const StackedBarChart = ({ data }) => {
  return (
    <div style={{ textAlign: 'center', margin: '5px' }}>
      <h2 className='text-[red]'>Orders Processed and Pending</h2>
      <BarChart
        width={420}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 10"/>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="products" stackId="a" fill="#82ca9d" name="Processed Orders" />
        <Bar dataKey="fruits" stackId="b" fill="#8884d8" name="Pending Orders" />
      </BarChart>
    </div>
  );
};

export default StackedBarChart;