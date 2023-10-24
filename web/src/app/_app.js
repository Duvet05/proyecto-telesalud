import { AppointmentsProvider } from "../context/AppointmentsContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppointmentsProvider>
      <Component {...pageProps} />
    </AppointmentsProvider>
  );
}

export default MyApp;
