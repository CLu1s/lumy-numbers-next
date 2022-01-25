import React from "react";
import { Amplify } from "aws-amplify";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { ChakraProvider } from "@chakra-ui/react";
import esLocale from "date-fns/locale/es";
import awsExports from "../aws-exports";
import Fonts from "../styles/fonts";
import theme from "../styles/theme";
import "../styles/globals.css";
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={esLocale}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </LocalizationProvider>
  );
}
export default MyApp;
