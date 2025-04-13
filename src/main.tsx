// Deps
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

// Store
import { store } from "../store/app";

// CSS
import "./index.css";

// Pages
import Home from "./pages/home";
import PokemonDetail from "./pages/detail";

// Constants
const root = document.getElementById("root");

ReactDOM.createRoot((root || <></>) as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
