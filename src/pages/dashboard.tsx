import React, { useState } from 'react';
import NavbarComponent from '~/components/navbar/navbar';
import exerciciosData from '~/data/execicios.json';
import Dropdown from '~/components/dropdown';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

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
  const id_usuario = session?.user?.id as string; /* eslint-disable-line  @typescript-eslint/non-nullable-type-assertion-style */

  const plotData = api.exercicios.getUserExerciseId.useQuery({
    id_usuario,
    id_exercicio: selectedExercicio,
  }).data;

  const selectExercicio = (id: number) => {
    setSelectedExercicio(id);
  };

  const exercicios = exerciciosData.exercicios;

  return (
    <>
      <div className="min-h-screen bg-gray-100 gap-1">
        <NavbarComponent />
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4 w-1/2 min-w-fit flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4">Filtro de Exercicício</h2>
            <div className="flex space-x-4 mb-4">
              <Dropdown options={exercicios} onSelect={selectExercicio} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center w-full">
            <div className="m-4 bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Consumo de calorias</h2>
              <BarChart1 />
            </div>
            <div className="m-4 bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-2xl font-semibold mb-4">Variação Peso</h2>
              {plotData && plotData.length > 0 ? (
                <BarChart2 data={plotData} />
              ) : (
                <h1>Nenhum exercicio feito</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
