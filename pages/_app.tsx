import React from "react";
import { Amplify } from "aws-amplify";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import "../styles/globals.css";
import awsExports from "../aws-exports";
import "../styles/globals.css";
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={esLocale}>
      <Component {...pageProps} />
    </LocalizationProvider>
  );
}
export default MyApp;
