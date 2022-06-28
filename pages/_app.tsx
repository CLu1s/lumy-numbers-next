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
import "@fontsource/inter/variable.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </Provider>
    </ChakraProvider>
  );
}
export default MyApp;
