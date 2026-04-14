import { useEffect, useState } from "react";
import {
  addPilha,
  deletePilha,
  deleteTopo,
  getPilha,
  getTopo,
} from "../services/pilhaService";

function PilhaPage() {
  const [itens, setItens] = useState<unknown[]>([]);
  const [valor, setValor] = useState("");
  const [topo, setTopo] = useState<unknown | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshPilha() {
    const dados = await getPilha();
    setItens(dados);
    try {
      const t = await getTopo();
      setTopo(t);
    } catch {
      setTopo(null);
    }
  }

  function notifyStatsUpdate() {
    window.dispatchEvent(new Event("estrutura-atualizada"));
  }

  useEffect(() => {
    refreshPilha().catch((err) => {
      setError(err instanceof Error ? err.message : String(err));
    });
  }, []);

  async function runAction(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await action();
      await refreshPilha();
      notifyStatsUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page page-stack">
      <div className="page-header">
        <h2>Pilha</h2>
        <span className="hint-chip">LIFO</span>
      </div>

      <section className="panel">
        <div className="structure-title">Visual da pilha</div>
        <div
          className="stack-canvas"
          role="img"
          aria-label="Pilha vertical com topo sinalizado"
        >
          {itens.length === 0 && <div className="empty-state">Pilha vazia</div>}
          <ul className="stack-list">
            {itens
              .slice()
              .reverse()
              .map((item, idx) => (
                <li
                  key={`${String(item)}-${idx}`}
                  className={`stack-item ${idx === 0 ? "stack-top" : ""}`}
                >
                  <span className="stack-value">{String(item)}</span>
                  {idx === 0 && <span className="marker">TOPO</span>}
                </li>
              ))}
          </ul>
          <div className="stack-base">BASE</div>
        </div>
      </section>

      <section className="panel controls-grid">
        <form
          className="inline-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!valor.trim()) return;
            await runAction(async () => {
              await addPilha(valor.trim());
              setValor("");
            });
          }}
        >
          <input
            className="text-input"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Item para empilhar"
            disabled={busy}
          />
          <button className="btn btn-primary" type="submit" disabled={busy}>
            Empilhar
          </button>
        </form>

        <div className="actions-row">
          <button
            className="btn"
            disabled={busy}
            onClick={() => runAction(async () => deleteTopo())}
          >
            Desempilhar topo
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={() => runAction(async () => deletePilha())}
          >
            Limpar pilha
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                const t = await getTopo();
                setTopo(t);
              } catch (err) {
                setTopo(null);
                setError(err instanceof Error ? err.message : String(err));
              } finally {
                setBusy(false);
              }
            }}
          >
            Consultar topo
          </button>
        </div>

        <div className="result-strip">
          <strong>Topo atual:</strong>{" "}
          {topo === null ? "(vazio)" : String(topo)}
        </div>
        {busy && <div className="status-info">Processando operacao...</div>}
        {error && <div className="status-error">{error}</div>}
      </section>
    </div>
  );
}

export default PilhaPage;
