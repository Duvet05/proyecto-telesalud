import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppointmentsProvider } from "@/context/AppointmentsContext";

const theme = createTheme({
  palette: {
    background: {
      default: "#c8e9ec",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <AppointmentsProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppointmentsProvider>
  );
}

export default MyApp;
