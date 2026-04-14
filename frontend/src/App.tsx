import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PilhaPage from "./pages/PilhaPage";
import FilaPage from "./pages/FilaPage";
import ListaPage from "./pages/ListaPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/pilha" replace />} />
          <Route path="/pilha" element={<PilhaPage />} />
          <Route path="/fila" element={<FilaPage />} />
          <Route path="/lista" element={<ListaPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
