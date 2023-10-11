import NavbarComponent from "~/components/navbar/navbar";
import ColComponent from "~/components/cronograma/coluna";


export default function Home() {

  return (
    <>
          <NavbarComponent/>
          {/* Main cubrindo o resto da pagina */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-center text-5xl font-medium my-8">Cronograma</h1>
            {/* container com altura que sobrar */}
            <div className="container flex flex-col md:flex-row items-center justify-center gap-2">
              <ColComponent name="Treino A" lines={6} tipo={1} />
              <ColComponent name="Treino B" lines={6} tipo={2}/>
              <ColComponent name="Treino C" lines={6} tipo={3}/>
              <ColComponent name="Treino D" lines={6} tipo={4}/>
            </div>
          </div>
  
    </>
  );
}