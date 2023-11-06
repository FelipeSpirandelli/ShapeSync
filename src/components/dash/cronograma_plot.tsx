import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { type Exercicios } from '@prisma/client';

const BarChart2 = (props: { data: Exercicios[] | null }) => {
  return (
    <>
      {props.data && (
        <BarChart width={360} height={360} data={props.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="peso" fill="#82ca9d" />
        </BarChart>
      )}
    </>
  );
};

export default BarChart2;
