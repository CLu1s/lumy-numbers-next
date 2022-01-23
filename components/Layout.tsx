import { useState } from "react";
import Loading, { LoadingType } from "./Loading";
import Topbar from "./Topbar";
import Typography, { Types } from "./Typography";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  userName: string;
};

const Layout = ({ children, pageTitle, userName }: Props) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading type={LoadingType.FULL_PAGE} />;
  }
  return (
    <div>

      <Topbar />
      <main className="pt-4 px-6 container">
          <Typography type={Types.H6}>Hola {userName}</Typography>
          {pageTitle && <Typography type={Types.H3}>{pageTitle}</Typography>}
          {children}
      </main>

      <footer></footer>
    </div>
  );
};
export default Layout;
