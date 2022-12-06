import Layout from "../components/layout";
import "../styles/globals.css";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout>
          <Box sx={{ minHeight: "20px" }} />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
