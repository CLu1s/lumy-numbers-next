import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
const theme = extendTheme({
  config: { initialColorMode: "light ", useSystemColorMode: true },
  fonts: {
    heading: "Manrope",
    body: "Manrope",
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode("gray.100", "gray.900")(props),
      },
    }),
  },
});

export default theme;
