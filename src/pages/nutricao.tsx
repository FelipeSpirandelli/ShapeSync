import { signIn, signOut, useSession } from "next-auth/react";
import NavbarComponent from "~/components/navbar/navbar";
import ColComponent from "~/components/nutricao/coluna";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

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

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
