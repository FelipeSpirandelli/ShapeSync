import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import exerciciosData from '~/data/execicios.json';
import { api } from '~/utils/api';

type Props = {
  name: string;
  lines: number;
  tipo: number;
};

const ColComponent: React.FC<Props> = ({ name, lines, tipo }) => {
  const { data: session } = useSession();
  const id_usuario = session?.user?.id as string;

  const [selectedExercicios, setSelectedExercicios] = useState<number[]>(Array.from({ length: lines }, () => 0));
  const [pesosSelecionados, setPesos] = useState<number[]>(Array.from({ length: lines }, () => 0));
  const [dataSelecionada, setDataSelecionada] = useState<string | undefined>('');

  const handleExercicioChange = (index: number, value: number) => {
    const newSelectedExercicios = [...selectedExercicios];
    newSelectedExercicios[index] = value;
    setSelectedExercicios(newSelectedExercicios);
  };

  const handlePesoChange = (index: number, value: number) => {
    const newPesos = [...pesosSelecionados];
    newPesos[index] = value;
    setPesos(newPesos);
  };

  const handleDataChange = (value: string) => {
    setDataSelecionada(value);
  };

  const exerciciosDB = api.exercicios.getExercicosMaisRecentesPorTreino.useQuery({ treino: tipo, id_usuario: id_usuario });

  useEffect(() => {
    if (exerciciosDB.data && exerciciosDB.data.length > 0) {
      const latestData = exerciciosDB.data[0];
      const data = latestData!.data;
      for (let i = 0; i < exerciciosDB.data.length; i++) {
        const dadosExercicios = exerciciosDB.data[i];
        const exercicio = dadosExercicios?.id_exercicio;
        const peso = dadosExercicios?.peso;
        if (exercicio) {
          setSelectedExercicios((prevState) => {
            const newState = [...prevState];
            newState[i] = exercicio;
            return newState;
          });
        }
        if (peso) {
          setPesos((prevState) => {
            const newState = [...prevState];
            newState[i] = peso;
            return newState;
          });
        }
      }
      setDataSelecionada(formatDate(data));
    }
  }, [id_usuario, exerciciosDB.data]);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const apagarDadosMutate = api.exercicios.apagarExerciciosPorTreino.useMutation();
  const adicionarDadosMutate = api.exercicios.adicionarExercicio.useMutation();

  const saveData = () => {
    const data_form = document.getElementById(`col${tipo}Data`) as HTMLInputElement;
    const valor_data = data_form.value;
    const data_formatada = new Date(valor_data);
    data_formatada.setDate(data_formatada.getDate() + 1);

    apagarDadosMutate.mutate({
      id_usuario: id_usuario,
      data: data_formatada,
      treino: tipo,
    });

    for (let i = 0; i < lines; i++) {
      const exercicio = document.getElementById(`col${tipo}line${i}Exer`) as HTMLSelectElement;
      const peso = document.getElementById(`col${tipo}line${i}Peso`) as HTMLInputElement;

      const exercicio_value = exercicio.value;
      const peso_value = peso.value;

      const data_padrao = '2021-06-01';
      let data_p = new Date(data_padrao);
      data_p.setDate(data_p.getDate() + 1);

      if (valor_data !== '') {
        data_p = data_formatada;
      }

      if (parseInt(exercicio_value) !== 0)
        adicionarDadosMutate.mutate({
          id_usuario: id_usuario,
          id_exercicio: parseInt(exercicio_value),
          peso: parseInt(peso_value),
          data: data_p,
          treino: tipo,
        });
    }
  };

    return (
        // Coluna de largura 1/4 do container e altura do que sobrar da tela com itens alinhados ao centro
        <div className="w-full md:w-1/4 h-full flex flex-col items-center justify-center gap-4">
            {/* Nome da coluna cor 264653 */}
            <p className="w-fit text-3xl text-azul_escuro font-medium py-1">{name}</p>
            {/* Começar formulario */}
            <form className="flex flex-col items-center justify-center gap-4 px-5">
                {Array.from(Array(lines).keys()).map((line) => {
                    return (
                        <div className="flex flex-row items-center justify-center gap-4" key={line}>
                            {/* Numero da linha */}
                            <p className="text-azul_escuro font-medium"> E {line + 1}</p>
                            {/* Input de exercicio */}
                            <select className="w-1/2 h-10 rounded-full px-4" id={"col"+tipo+"line"+line+"Exer"} name={"col"+tipo+"line"+line+"Exer"} 
                                value={selectedExercicios[line]} onChange={(e) => handleExercicioChange(line, parseInt(e.target.value))}>
                                {/* Padrão */}
                                <option value={0} key={0}>Sem Exercicio</option>
                                {/* Mapear exercicios */}
                                {exercicios.map((exercicio) => (
                                <option key={exercicio.id} value={exercicio.id}>
                                    {exercicio.nome}
                                </option>
                                ))}
                            </select>
                            {/* Input de Peso */}
                            <input className="w-1/4 h-10 rounded-full px-4" type="number" placeholder="Kg" id={"col"+tipo+"line"+line+"Peso"} name={"col"+tipo+"line"+line+"Peso"} 
                                value={pesosSelecionados[line]} onChange={(e) => handlePesoChange(line, parseInt(e.target.value))}/>
                            {/* Input de Repetições */}
                        </div>
                    )
                })}
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                    {/* Input de Data */}
                    <input className="w-1/2 h-10 rounded-full px-4" type="date" placeholder="Data" id={"col"+tipo+"Data"} name={"col"+tipo+"Data"} 
                        value={dataSelecionada} onChange={(e) => handleDataChange(e.target.value)}/>
                    {/* Botão Salvar */}
                    <button className="w-1/2 h-10 rounded-full px-4 bg-azul_escuro text-white font-medium" type="button" onClick={saveData}>Salvar</button>
                </div>
            </form>
        </div>
    );
};

// Carregar os dados dos exercicios
const exercicios = exerciciosData.exercicios

export default ColComponent;