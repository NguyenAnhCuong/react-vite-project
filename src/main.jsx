import ReactDOM from "react-dom/client";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./index.css";
import "nprogress/nprogress.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-18-image-lightbox/style.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "./components/utils/i18n.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>

  //  </React.StrictMode>
);
