import { useEffect, useState } from "react";
import { getEstatisticas } from "../services/estatisticasService";
import { Link } from "react-router-dom";
import { type Estatisticas } from "../types/estruturas";

function Navbar() {
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    fetchStats();
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        padding: 8,
        background: "#eee",
      }}
    >
      <Link to="/pilha">Pilha</Link>
      <Link to="/fila">Fila</Link>
      <Link to="/lista">Lista</Link>
      <span style={{ marginLeft: "auto" }}>
        {loading && "Carregando..."}
        {error && <span style={{ color: "red" }}>{error}</span>}
        {estatisticas && (
          <span>Total estruturas: {estatisticas.totalEstruturasCriadas}</span>
        )}
      </span>
    </nav>
  );
}
export default Navbar;