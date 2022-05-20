import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "light ", useSystemColorMode: true },
  fonts: {
    heading: "Manrope",
    body: "Manrope",
  },
});

export default theme;
