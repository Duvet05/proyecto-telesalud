import { AppointmentsProvider } from "@/context/AppointmentsContext"; // Asegúrate de importar tu AppointmentsProvider
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppointmentsProvider>
      <Component {...pageProps} />
    </AppointmentsProvider>
  );
}

export default MyApp;
