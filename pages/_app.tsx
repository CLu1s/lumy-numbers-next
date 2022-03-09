import React from "react";
import Amplify from "aws-amplify";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../store";
import awsExports from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import Fonts from "../styles/fonts";
import theme from "../styles/theme";
Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </ChakraProvider>
  );
}
export default MyApp;
