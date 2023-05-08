import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getChartDets } from '../../Api/adminApi';

function AdminCharts() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const invoke = async () => {
      const result = await getChartDets();
      setData(result.data);
    };
    invoke();
  }, []);

  return (
    <div className="w-[95vw] h-[50vh] flex justify-center items-center">
      <LineChart width={900} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        {/* <Line type="monotone" dataKey="_id" stroke="#8884d8" /> */}
        <Line type="monotone" dataKey="followers" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
      </LineChart>

    </div>
  );
}

export default AdminCharts;
