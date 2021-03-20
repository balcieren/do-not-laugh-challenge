import { Box, ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { FC } from "react";
import "../styles/font.css";
import { theme } from "../styles/theme";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box bgGradient="linear(to-br, blue.400, purple.500)">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
