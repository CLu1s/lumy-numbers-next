import React from 'react';
import { Amplify } from "aws-amplify";
import '../styles/globals.css';
import awsExports from "../aws-exports";
import '../styles/globals.css';
Amplify.configure({...awsExports, ssr: true});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default MyApp;
