import React from "react";
import Amplify from 'aws-amplify';
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../store";
import awsExports from "../aws-exports";
import Fonts from "../styles/fonts";
import theme from "../styles/theme";
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
export default MyApp;
