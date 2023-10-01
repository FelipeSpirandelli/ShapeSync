"use client";
import React from 'react';
import { useSession } from "next-auth/react";
// import json exercicios
import exerciciosData from '~/data/execicios.json'

import { api } from "~/utils/api";

type props = {
    name: string,
    lines: number,
    tipo: number,

}


const ColComponent: React.FC<props> = ({ name, lines, tipo }) => {
    
    // Carregar os exercicios do banco de dados
    const exerciciosDB = api.exercicios.getExercicosMaisRecentesPorTreino.useQuery({ treino: tipo, id_usuario: "cln7ygmxq0000rlb8hoj05cry"})
    
    // se tem algo da console no data    
    if(exerciciosDB.data){
        if(exerciciosDB.data.length > 0){
            console.log(tipo)
            console.log(exerciciosDB.data)
        }
    }

    return (
        // Coluna de largura 1/4 do container e altura do que sobrar da tela com itens alinhados ao centro
        <div className="w-1/4 h-full flex flex-col items-center justify-center gap-4">
            {/* Nome da coluna cor 264653 */}
            <p className="text-3xl text-azul_escuro font-medium py-1">{name}</p>
            {/* Começar formulario */}
            <form className="flex flex-col items-center justify-center gap-4 px-5">
                {Array.from(Array(lines).keys()).map((line) => {
                    return (
                        <div className="flex flex-row items-center justify-center gap-4">
                            {/* Numero da linha */}
                            <p className="text-azul_escuro font-medium"> E {line + 1}</p>
                            {/* Input de exercicio */}
                            <select className="w-1/2 h-10 rounded-full px-4">
                                {/* Padrão */}
                                <option value="" disabled selected>Exercicio</option>
                                {/* Mapear exercicios */}
                                {exercicios.map((exercicio) => (
                                <option key={exercicio.id} value={exercicio.id}>
                                    {exercicio.nome}
                                </option>
                                ))}
                            </select>
                            {/* Input de Peso */}
                            <input className="w-1/4 h-10 rounded-full px-4" type="number" placeholder="Kg" />
                        </div>
                    )
                })}
                <div className="flex flex-row items-center justify-center gap-4 w-full">
                    {/* Input de Data */}
                    <input className="w-1/2 h-10 rounded-full px-4" type="date" placeholder="Data" />
                    {/* Botão Salvar */}
                    <button className="w-1/2 h-10 rounded-full px-4 bg-azul_escuro text-white font-medium">Salvar</button>
                </div>
            </form>
        </div>
    );
};

// Carregar os dados dos exercicios
const exercicios = exerciciosData.exercicios

export default ColComponent;