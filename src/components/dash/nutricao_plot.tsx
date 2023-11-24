import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import alimentosData from '~/data/alimentos.json';
import { Alimentos } from '@prisma/client';

const alimentos = alimentosData.alimentos;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const COLORS_FADE = ['#0088FE80', '#00C49F80', '#FFBB2880'];

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
    { name: 'Proteinas g', value: proteinas },
    { name: 'Carboidratos g', value: carboidratos },
    { name: 'Gorduras g', value: gorduras },
  ];

  const newDataCalorias = [
    { name: 'Proteinas Kcal', value: proteinas * 4 },
    { name: 'Carboidratos Kcal', value: carboidratos * 4 },
    { name: 'Gorduras Kcal', value: gorduras * 9 },
  ];

  const centerText = `${calorias} kcal`;

  return (
    <PieChart width={420} height={360}>
      <Pie data={newDataCalorias} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
        {newData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS_FADE[index % COLORS_FADE.length]} />
        ))}
      </Pie>
      <Pie data={newData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label paddingAngle={5}>
        {newData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <text x="50%" y="43%" textAnchor="middle" dominantBaseline="middle" fontSize="1.2em" style={{ fontWeight: 'bold'}}>
        {centerText}
      </text>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default BarChart1;
