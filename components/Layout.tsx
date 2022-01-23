import { useState } from "react";
import Head from "next/head";
import Loading, { LoadingType } from "./Loading";
// import Topbar from "./Topbar";
import Typography, { Types } from "./Typography";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
};

const Layout = ({ children, pageTitle }: Props) => {
  const [loading, setLoading] = useState(false);
  const name = "Next.js";
  if (loading) {
    return <Loading type={LoadingType.FULL_PAGE} />;
  }
  return (
    <div>
      <Head>
        <title>Lumy Numbers</title>
        <meta name="description" content="Control de Gastos y Presupuesto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Topbar /> */}
      <main className="pt-4 px-6 container">
          <Typography type={Types.H6}>Hola {name}</Typography>
          {pageTitle && <Typography type={Types.H3}>{pageTitle}</Typography>}
          {children}
      </main>

      <footer></footer>
    </div>
  );
};
export default Layout;
