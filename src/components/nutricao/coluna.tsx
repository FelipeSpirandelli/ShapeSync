import React from 'react';
// import json exercicios
import alimentosData from '~/data/alimentos.json'

type props = {
    name: string,
    lines: number
}


const ColComponent: React.FC<props> = ({ name, lines }) => {

    return (
        // Coluna de largura 1/4 do container e altura do que sobrar da tela com itens alinhados ao centro
        <div className="w-1/4 h-full flex flex-col items-center justify-center gap-4">
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
                            <select className="w-1/2 h-10 rounded-full px-4">
                                {/* Padrão */}
                                <option value="" disabled selected>Alimento</option>
                                {/* Mapear alimentos */}
                                {alimentos.map((alimento) => (
                                <option key={alimento.id} value={alimento.id}>
                                    {alimento.nome}
                                </option>
                                ))}
                            </select>
                            {/* Input de Peso */}
                            <input className="w-1/4 h-10 rounded-full px-4" type="number" placeholder="g" />
                        </div>
                    )
                })}
                <p className="text-3xl text-azul_escuro font-medium py-1">Lanche</p>
                {Array.from(Array(lines).keys()).map((line) => {
                    return (
                        <div className="flex flex-row items-center justify-center gap-4" key={line}>
                            {/* Numero da linha */}
                            <p className="text-azul_escuro font-medium"> {line + 1}</p>
                            {/* Input de alimento */}
                            <select className="w-1/2 h-10 rounded-full px-4">
                                {/* Padrão */}
                                <option value="" disabled selected>Alimento</option>
                                {/* Mapear alimentos */}
                                {alimentos.map((alimento) => (
                                <option key={alimento.id} value={alimento.id}>
                                    {alimento.nome}
                                </option>
                                ))}
                            </select>
                            {/* Input de Peso */}
                            <input className="w-1/4 h-10 rounded-full px-4" type="number" placeholder="g" />
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