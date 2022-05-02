import { useEffect } from "react";
import { useRouter } from "next/router";

const Redirect = ({ href }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(href);
  }, []);
  return (
    <div>
      <h1>{router.query.name}</h1>
      <p>Redirigiendo...</p>
    </div>
  );
};

export default Redirect;
