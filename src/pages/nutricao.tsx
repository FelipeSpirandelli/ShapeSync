import NavbarComponent from "~/components/navbar/navbar";
import ColComponent from "~/components/nutricao/coluna";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

import alimentosData from '~/data/alimentos.json'
import { set } from "zod";

const alimentos = alimentosData.alimentos;


export default function Home() {
  const { data: session } = useSession();
  const id_usuario = session?.user?.id as string;

  const [cafeAlimentos, setCafeAlimentos] = useState<number[]>([]);
  const [almocoAlimentos, setAlmocoAlimentos] = useState<number[]>([]);
  const [jantarAlimentos, setJantarAlimentos] = useState<number[]>([]);
  const [lanche1Alimentos, setLanche1Alimentos] = useState<number[]>([]);
  const [lanche2Alimentos, setLanche2Alimentos] = useState<number[]>([]);
  const [ceiaAlimentos, setCeiaAlimentos] = useState<number[]>([]);

  const [cafePesos, setCafePesos] = useState<number[]>([]);
  const [almocoPesos, setAlmocoPesos] = useState<number[]>([]);
  const [jantarPesos, setJantarPesos] = useState<number[]>([]);
  const [lanche1Pesos, setLanche1Pesos] = useState<number[]>([]);
  const [lanche2Pesos, setLanche2Pesos] = useState<number[]>([]);
  const [ceiaPesos, setCeiaPesos] = useState<number[]>([]);

  const [calorias, setCalorias] = useState<number>(0);

  const setCafeValues = (alimentos: number[], pesos: number[]) => {
    setCafeAlimentos(alimentos);
    setCafePesos(pesos);
  }

  const setAlmocoValues = (alimentos: number[], pesos: number[]) => {
    setAlmocoAlimentos(alimentos);
    setAlmocoPesos(pesos);
  }

  const setJantarValues = (alimentos: number[], pesos: number[]) => {
    setJantarAlimentos(alimentos);
    setJantarPesos(pesos);
  }

  const setLanche1Values = (alimentos: number[], pesos: number[]) => {
    setLanche1Alimentos(alimentos);
    setLanche1Pesos(pesos);
  }

  const setLanche2Values = (alimentos: number[], pesos: number[]) => {
    setLanche2Alimentos(alimentos);
    setLanche2Pesos(pesos);
  }

  const setCeiaValues = (alimentos: number[], pesos: number[]) => {
    setCeiaAlimentos(alimentos);
    setCeiaPesos(pesos);
  }

  // Calcular as calorias quando os alimentos ou pesos mudarem
  useEffect(() => {
    // Calcular as calorias de cada coluna
    // Calorias do café
    let caloriasCafe = 0;
    for(const i in cafeAlimentos) {
      const alimento = cafeAlimentos[i];
      const peso = cafePesos[i];
      if(alimento && peso) {
        const alimentoInfo = alimentos.find(alimentoInfo => alimentoInfo.id === alimento);
        if(alimentoInfo) {
          caloriasCafe += alimentoInfo.calorias_por_100g * peso/100;
        }
      }
    }
    // Calorias do almoço
    let caloriasAlmoco = 0;
    for(const i in almocoAlimentos) {
      const alimento = almocoAlimentos[i];
      const peso = almocoPesos[i];
      if(alimento && peso) {
        const alimentoInfo = alimentos.find(alimentoInfo => alimentoInfo.id === alimento);
        if(alimentoInfo) {
          caloriasAlmoco += alimentoInfo.calorias_por_100g * peso/100;
        }
      }
    }
    // Calorias do jantar
    let caloriasJantar = 0;
    for(const i in jantarAlimentos) {
      const alimento = jantarAlimentos[i];
      const peso = jantarPesos[i];
      if(alimento && peso) {
        const alimentoInfo = alimentos.find(alimentoInfo => alimentoInfo.id === alimento);
        if(alimentoInfo) {
          caloriasJantar += alimentoInfo.calorias_por_100g * peso/100;
        }
      }
    }
    // Calorias do lanche 1
    let caloriasLanche1 = 0;
    for(const i in lanche1Alimentos) {
      const alimento = lanche1Alimentos[i];
      const peso = lanche1Pesos[i];
      if(alimento && peso) {
        const alimentoInfo = alimentos.find(alimentoInfo => alimentoInfo.id === alimento);
        if(alimentoInfo) {
          caloriasLanche1 += alimentoInfo.calorias_por_100g * peso/100;
        }
      }
    }
    // Calorias do lanche 2
    let caloriasLanche2 = 0;
    for(const i in lanche2Alimentos) {
      const alimento = lanche2Alimentos[i];
      const peso = lanche2Pesos[i];
      if(alimento && peso) {
        const alimentoInfo = alimentos.find(alimentoInfo => alimentoInfo.id === alimento);
        if(alimentoInfo) {
          caloriasLanche2 += alimentoInfo.calorias_por_100g * peso/100;
        }
      }
    }
    // Calorias da ceia
    let caloriasCeia = 0;
    for(const i in ceiaAlimentos) {
      const alimento = ceiaAlimentos[i];
      const peso = ceiaPesos[i];
      if(alimento && peso) {
        const alimentoInfo = alimentos.find(alimentoInfo => alimentoInfo.id === alimento);
        if(alimentoInfo) {
          caloriasCeia += alimentoInfo.calorias_por_100g * peso/100;
        }
      }
    }
    // Calorias totais
    const caloriasTotais = caloriasCafe + caloriasAlmoco + caloriasJantar + caloriasLanche1 + caloriasLanche2 + caloriasCeia;
    setCalorias(caloriasTotais);
  }, [cafeAlimentos, almocoAlimentos, jantarAlimentos, lanche1Alimentos, lanche2Alimentos, ceiaAlimentos, cafePesos, almocoPesos, jantarPesos, lanche1Pesos, lanche2Pesos, ceiaPesos]);

  const apagarDadosMutate = api.nutricao.apagarAlimentos.useMutation();
  const adicionarDadosMutate = api.nutricao.adicionarAlimento.useMutation();

  const salvarDados = () => {
    // Apagar todos os dados
    apagarDadosMutate.mutate({
      id_usuario: id_usuario,
    });
    console.log(cafeAlimentos);
    // Salvar todos os dados
    for(const i in cafeAlimentos) {
      const alimento = cafeAlimentos[i];
      const peso = cafePesos[i];
      if(alimento && peso) {
        adicionarDadosMutate.mutate({
          id_usuario: id_usuario,
          id_alimento: alimento,
          peso: peso,
          tipo: 1,
        });
      }
    }
    for(const i in almocoAlimentos) {
      const alimento = almocoAlimentos[i];
      const peso = almocoPesos[i];
      if(alimento && peso) {
        adicionarDadosMutate.mutate({
          id_usuario: id_usuario,
          id_alimento: alimento,
          peso: peso,
          tipo: 3,
        });
      }
    }
    for(const i in jantarAlimentos) {
      const alimento = jantarAlimentos[i];
      const peso = jantarPesos[i];
      if(alimento && peso) {
        adicionarDadosMutate.mutate({
          id_usuario: id_usuario,
          id_alimento: alimento,
          peso: peso,
          tipo: 5,
        });
      }
    }
    for(const i in lanche1Alimentos) {
      const alimento = lanche1Alimentos[i];
      const peso = lanche1Pesos[i];
      if(alimento && peso) {
        adicionarDadosMutate.mutate({
          id_usuario: id_usuario,
          id_alimento: alimento,
          peso: peso,
          tipo: 2,
        });
      }
    }
    for(const i in lanche2Alimentos) {
      const alimento = lanche2Alimentos[i];
      const peso = lanche2Pesos[i];
      if(alimento && peso) {
        adicionarDadosMutate.mutate({
          id_usuario: id_usuario,
          id_alimento: alimento,
          peso: peso,
          tipo: 4,
        });
      }
    }
    for(const i in ceiaAlimentos) {
      const alimento = ceiaAlimentos[i];
      const peso = ceiaPesos[i];
      if(alimento && peso) {
        adicionarDadosMutate.mutate({
          id_usuario: id_usuario,
          id_alimento: alimento,
          peso: peso,
          tipo: 6,
        });
      }
    }
    
  }

  return (
    <>
          <NavbarComponent/>
          {/* Main cubrindo o resto da pagina */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-5xl font-medium my-8">Nutrição</h1>
            {/* container com altura que sobrar */}
            <div className="container grid grid-cols-3 items-center justify-center gap-2">
                <ColComponent name="Café"   lines={5} tipo={1} setValues={setCafeValues}/>
                <ColComponent name="Almoço" lines={5} tipo={3} setValues={setAlmocoValues}/>
                <ColComponent name="Jantar" lines={5} tipo={5} setValues={setJantarValues}/>
                <ColComponent name="Lanche" lines={3} tipo={2} setValues={setLanche1Values}/>
                <ColComponent name="Lanche" lines={3} tipo={4} setValues={setLanche2Values}/>            
                <ColComponent name="Ceia"   lines={3} tipo={6} setValues={setCeiaValues}/>
            </div>
            <div className="flex flex-row items-center justify-center gap-4 w-full my-4">
                <p>Calorias:</p>
                <input className="w-1/8 h-10 rounded-full px-4" type="number" placeholder="Calorias" disabled value={calorias}/>
                <button className="w-1/4 h-10 rounded-full px-4 bg-azul_escuro text-white font-medium" onClick={salvarDados}>Salvar</button>
            </div>
          </div>
    </>
  );
}
