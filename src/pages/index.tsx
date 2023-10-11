import { signIn, signOut, useSession } from "next-auth/react";
import NavbarComponent from "~/components/navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUtensils, faUsers } from '@fortawesome/free-solid-svg-icons';

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <NavbarComponent />

      <div className="h-screen bg-gray-100 flex items-center justify-center p-20">
        <div className="max-w-4xl flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Transformando Vidas Através da Coleta de Dados</h1>
          <p className="text-gray-600 mb-8">
            Bem-vindo ao nosso site! Tenha um impacto positivo na sua vida Fit astravés da coleta de dados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FontAwesomeIcon icon={faDumbbell} className="text-4xl text-blue-500 mb-2" />
              <h2 className="text-xl font-semibold">Treinamento Personalizado</h2>
              <p className="text-gray-600">
                Oferecemos treinamento personalizado com base em dados precisos para ajudar você a atingir seus objetivos de fitness.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon icon={faUtensils} className="text-4xl text-green-500 mb-2" />
              <h2 className="text-xl font-semibold">Dietas Saudáveis</h2>
              <p className="text-gray-600">
                Nossos planos de dieta são projetados para atender às suas necessidades específicas, proporcionando resultados reais.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon icon={faUsers} className="text-4xl text-purple-500 mb-2" />
              <h2 className="text-xl font-semibold">Comunidade Apoiadora</h2>
              <p className="text-gray-600">
                Junte-se à nossa comunidade de entusiastas de fitness e compartilhe suas conquistas e jornada.
              </p>
            </div>
          </div>
          <div>
            <AuthShowcase />
          </div>
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
    <div className="flex flex-col items-center justify-center gap-4 p-5">
      <p className="text-center text-2xl">
        {sessionData && <span>Você fez login como {sessionData.user?.name}</span>}
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
