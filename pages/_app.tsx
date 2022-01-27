import React from "react";
import { Amplify } from "aws-amplify";

import { ChakraProvider } from "@chakra-ui/react";
import awsExports from "../aws-exports";
import Fonts from "../styles/fonts";
import theme from "../styles/theme";
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
