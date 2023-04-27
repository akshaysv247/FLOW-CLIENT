/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getChartDet } from '../../Api/artistApi';

function ArtistCharts() {
  const [data, setData] = useState([]);
  const { id } = useSelector((state) => state.artist);
  useEffect(() => {
    const invoke = async () => {
      const result = await getChartDet(id);
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

export default ArtistCharts;
