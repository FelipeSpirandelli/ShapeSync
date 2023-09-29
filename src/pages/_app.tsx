import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Ubuntu } from "next/font/google";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "700"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>ShapeSync</title>
        <meta name="description" content="ShapeSync. Melhor lugar para acompanhar o shape" key="title" />
      </Head>
      <main className={ubuntu.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
