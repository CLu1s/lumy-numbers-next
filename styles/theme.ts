import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "gray.100",
      },
    },
  },
  fonts: {
    heading: "Manrope",
    body: "Manrope",
  },
});

export default theme;
