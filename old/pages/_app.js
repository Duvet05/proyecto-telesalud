import { Provider } from "react-redux";
import store from "../redux/store";
import { AppointmentsProvider } from "./AppointmentsContext"; // Asegúrate de importar tu AppointmentsProvider
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppointmentsProvider>
        <Component {...pageProps} />
      </AppointmentsProvider>
    </Provider>
  );
}

export default MyApp;
