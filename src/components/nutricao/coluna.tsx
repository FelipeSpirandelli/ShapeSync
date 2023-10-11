import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import alimentosData from '~/data/alimentos.json'
import { api } from '~/utils/api';
import { set } from 'zod';

type props = {
    name: string,
    lines: number,
    tipo: number,
    setValues: Function
}


const ColComponent: React.FC<props> = ({ name, lines, tipo, setValues }) => {

    const { data: session } = useSession();
    const id_usuario = session?.user?.id as string;

    const [selectedAlimentos, setSelectedAlimentos] = useState<number[]>(Array.from({ length: lines }, () => 0));
    const [pesosSelecionados, setPesos] = useState<number[]>(Array.from({ length: lines }, () => 0));

    const handleAlimentoChange = (index: number, value: number) => {
        const newSelectedAlimentos = [...selectedAlimentos];
        newSelectedAlimentos[index] = value;
        setSelectedAlimentos(newSelectedAlimentos);
        setValues(newSelectedAlimentos, pesosSelecionados);
    };

    const handlePesoChange = (index: number, value: number) => {
        const newPesos = [...pesosSelecionados];
        newPesos[index] = value;
        setPesos(newPesos);
        setValues(selectedAlimentos, newPesos);
    };

    const alimentosDB = api.nutricao.getAlimentosPorID.useQuery({ id_usuario: id_usuario, tipo: tipo });

    useEffect(() => {
        let alimentos: number[] = [];
        let pesos: number[] = [];

        if(alimentosDB.data && alimentosDB.data.length > 0) {
            for(let i = 0; i < alimentosDB.data.length; i++) {
                const dadosAlimentos = alimentosDB.data[i];
                const alimento = dadosAlimentos?.id_alimento;
                const peso = dadosAlimentos?.peso;
                if(alimento) {
                    alimentos.push(alimento);
                }
                if(peso) {
                    pesos.push(peso);
                }
            }
            for (let i = alimentos.length; i < lines; i++) {
                alimentos.push(0);
                pesos.push(0);
            }
            setSelectedAlimentos(alimentos);
            setPesos(pesos);
            setValues(alimentos, pesos);
        }

    }, [alimentosDB.data]);

    return (
        // Coluna de largura 1/4 do container e altura do que sobrar da tela com itens alinhados ao centro
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            {/* Nome da coluna cor 264653 */}
            <p className="text-3xl text-azul_escuro font-medium py-1">{name}</p>
            {/* Começar formulario */}
            <form className="flex flex-col items-center justify-center gap-4 px-5">
                {Array.from(Array(lines).keys()).map((line) => {
                    return (
                        <div className="flex flex-row items-center justify-center gap-4" key={line}>
                            {/* Numero da linha */}
                            <p className="text-azul_escuro font-medium"> {line + 1}</p>
                            {/* Input de alimento */}
                            <select className="w-1/2 h-10 rounded-full px-4" 
                                id={"col"+tipo+"line"+line+"Ref"} name={"col"+tipo+"line"+line+"Ref"} 
                                value={selectedAlimentos[line]} onChange={(e) => handleAlimentoChange(line, parseInt(e.target.value))} >
                                {/* Padrão */}
                                <option key={0} value={0} >Alimento</option>
                                {/* Mapear alimentos */}
                                {alimentos.map((alimento) => (
                                <option key={alimento.id} value={alimento.id}>
                                    {alimento.nome}
                                </option>
                                ))}
                            </select>
                            {/* Input de Peso */}
                            <input className="w-1/4 h-10 rounded-full px-4" type="number" placeholder="g" 
                                id={"col"+tipo+"line"+line+"Peso"} name={"col"+tipo+"line"+line+"Peso"} 
                                value={pesosSelecionados[line]} onChange={(e) => handlePesoChange(line, parseInt(e.target.value))}/>
                        </div>
                    )
                })}                
            </form>
        </div>
    );
};

// Carregar os dados dos exercicios
const alimentos = alimentosData.alimentos


export default ColComponent;