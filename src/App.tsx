// Deps
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

// Pages
import Home from "./pages/home";
import PokemonDetail from "./pages/detail";

const App = () => {
  const basename = import.meta.env["VITE_APP_BASE_PATH"] || undefined;

  useEffect(() => {
    console.log(basename);
  }, [basename]);

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
