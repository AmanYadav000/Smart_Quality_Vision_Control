import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';



const OrdersBarGraph = ({data}) => {
  return (
    <div style={{ textAlign: 'center', margin: '5px' }}>
      <h2>Rotten products Over Time</h2>
      <BarChart
        width={350}
        height={280}
        data={data}
        margin={{ top: 20, right: 30, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="0 20" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rotten" fill="#8884d8" barSize={20} />
      </BarChart>
    </div>
  );
};

export default OrdersBarGraph;
