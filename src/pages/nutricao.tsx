import NavbarComponent from "~/components/navbar/navbar";
import ColComponent from "~/components/nutricao/coluna";


export default function Home() {

  return (
    <>
          <NavbarComponent/>
          {/* Main cubrindo o resto da pagina */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-5xl font-medium my-8">Nutrição</h1>
            {/* container com altura que sobrar */}
            <div className="container flex flex-row items-center justify-center gap-2">
              <ColComponent name="Café" lines={3} />
              <ColComponent name="Almoço" lines={3} />
              <ColComponent name="Jantar" lines={3} />
            </div>
            <div className="flex flex-row items-center justify-center gap-4 w-full my-1">
                <input className="w-1/4 h-10 rounded-full px-4" type="number" placeholder="Calorias" disabled/>
                <button className="w-1/4 h-10 rounded-full px-4 bg-azul_escuro text-white font-medium">Salvar</button>
            </div>
          </div>
  
    </>
  );
}
