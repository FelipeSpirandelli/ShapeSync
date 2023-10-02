import React, { useState, useEffect } from 'react';
import NavbarComponent from '~/components/navbar/navbar';
import exerciciosData from '~/data/execicios.json';
import Dropdown from '~/components/dropdown';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { Exercicios } from '@prisma/client';

import { api } from '~/utils/api';

const BarChart1 = dynamic(() => import('~/components/dash/nutricao_plot'), {
  ssr: false,
});

const BarChart2 = dynamic(() => import('~/components/dash/cronograma_plot'), {
  ssr: false,
});

const Dashboard = () => {
  const [selectedExercicio, setSelectedExercicio] = useState<number>(1);
  const { data: session } = useSession();
  const id_usuario = session?.user?.id as string;

  const plotData = api.exercicios.getUserExerciseId.useQuery({
    id_usuario,
    id_exercicio: selectedExercicio!,
  }).data;

  const selectExercicio = (id: number) => {
    setSelectedExercicio(id);
  };

  const exercicios = exerciciosData.exercicios;

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-4xl mb-4">
          <h2 className="text-2xl font-semibold mb-4">Filtro de Exercicício</h2>
          <div className="flex space-x-4 mb-4">
            <Dropdown options={exercicios} onSelect={selectExercicio} />
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="m-4 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Bar Chart 1</h2>
            <BarChart1 />
          </div>
          <div className="m-4 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Bar Chart 2</h2>
            {plotData && plotData.length > 0 ? (
              <BarChart2 data={plotData} />
            ) : (
              <h1>Nenhum exercicio feito</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
