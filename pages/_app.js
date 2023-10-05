import { Provider } from "react-redux";
import { store } from "../redux/store"; // Asegúrate de que esta ruta apunte a tu store de Redux
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
