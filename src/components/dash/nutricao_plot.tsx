import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import alimentosData from '~/data/alimentos.json';
import { Alimentos } from '@prisma/client';

const alimentos = alimentosData.alimentos;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const BarChart1 = (props: { data: Alimentos[] | null }) => {

  let proteinas = 0;
  let carboidratos = 0;
  let gorduras = 0;
  let calorias = 0;

  if(props.data && props.data.length > 0) {
    for(let i = 0; i < props.data.length; i++) {
      const dadosAlimentos = props.data[i];
      const alimento = dadosAlimentos?.id_alimento;
      let peso = dadosAlimentos?.peso;
      if(alimento && peso) {
        peso = peso/100;
        const alimentoData = alimentos[alimento];
        if(alimentoData) {
          console.log(alimentoData.calorias_por_100g, peso, calorias);
          proteinas += alimentoData.proteina * peso;
          carboidratos += alimentoData.carboidrato * peso;
          gorduras += alimentoData.gordura * peso;
          calorias += alimentoData.calorias_por_100g * peso;
        }
      }
    }
    proteinas = Math.round(proteinas);
    carboidratos = Math.round(carboidratos);
    gorduras = Math.round(gorduras);
    calorias = Math.round(calorias);
  }

  const newData = [
    { name: 'Proteinas', value: proteinas },
    { name: 'Carboidratos', value: carboidratos },
    { name: 'Gorduras', value: gorduras },
  ];

  const centerText = `${calorias} kcal`;

  return (
    <PieChart width={360} height={360}>
      <Pie data={newData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label paddingAngle={5}>
        {newData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" fontSize="1.2em">
        {centerText}
      </text>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default BarChart1;
