import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
        @font-face {
        font-family: "Manrope";
        src: url('../fonts/Manrope.woff2') format('woff2'), url("../fonts/Manrope.ttf") format('ttf');
        font-weight: 125 950;
        font-display: swap;
      }
      `}
  />
);

export default Fonts;
