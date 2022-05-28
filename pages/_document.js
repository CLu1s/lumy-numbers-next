import { ColorModeScript } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../styles/theme";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta
            name="description"
            content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres"
          />
          <meta
            name="theme-color"
            content="#edf2f7"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#171923"
            media="(prefers-color-scheme: dark)"
          />
          <link rel="icon" href="/favicon.ico" />
          <script
            async
            defer
            data-website-id="82f2b602-3851-4b75-bd15-5c805e89b2ff"
            src="https://analitycs.luminusapp.com/umami.js"
          ></script>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
