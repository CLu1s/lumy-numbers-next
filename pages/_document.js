import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link rel="apple-touch-startup-image" href="/launch.png"></link>
          <meta name="theme-color" content="#edf2f7" />
          <script
            async
            defer
            data-website-id="82f2b602-3851-4b75-bd15-5c805e89b2ff"
            src="http://143.110.153.45/umami.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
