import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme.ts";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client.ts";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    {/* <StrictMode> */}
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    {/* </StrictMode> */}
  </ApolloProvider>
);
