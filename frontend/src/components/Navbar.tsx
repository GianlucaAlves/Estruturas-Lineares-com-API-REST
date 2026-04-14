import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEstatisticas } from "../services/estatisticasService";
import { type Estatisticas } from "../types/estruturas";

function Navbar() {
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const res = await getEstatisticas();
        setEstatisticas(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    function handleRefresh() {
      fetchStats();
    }

    fetchStats();
    window.addEventListener("estrutura-atualizada", handleRefresh);
    return () =>
      window.removeEventListener("estrutura-atualizada", handleRefresh);
  }, []);

  return (
    <nav className="nav-root">
      <div className="nav-links">
        <Link to="/pilha">Pilha</Link>
        <Link to="/fila">Fila</Link>
        <Link to="/lista">Lista</Link>
      </div>

      <div className="nav-stats" aria-live="polite">
        {loading && <span>Atualizando...</span>}
        {error && (
          <span className="status-error">Falha ao carregar estatisticas</span>
        )}
        {estatisticas && (
          <>
            <span className="stat-chip">
              Total: {estatisticas.totalEstruturasCriadas}
            </span>
            <span className="stat-chip">
              Pilha: {estatisticas.pilha.tamanho}
            </span>
            <span className="stat-chip">Fila: {estatisticas.fila.tamanho}</span>
            <span className="stat-chip">
              Lista: {estatisticas.lista.tamanho}
            </span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
