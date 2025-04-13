// Deps
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

// Store
import { store } from "../store/app";

// CSS
import "./index.css";

// Main Module
import App from "./App";

// Constants
const root = document.getElementById("root");

ReactDOM.createRoot((root || <></>) as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
