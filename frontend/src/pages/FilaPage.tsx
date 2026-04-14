import { useEffect, useState } from "react";
import {
  addFila,
  deleteFrente,
  deleteFila,
  getFila,
  getFrente,
} from "../services/filaService";

function FilaPage() {
  const [itens, setItens] = useState<unknown[]>([]);
  const [valor, setValor] = useState("");
  const [frente, setFrente] = useState<unknown | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshFila() {
    const dados = await getFila();
    setItens(dados);
    try {
      const f = await getFrente();
      setFrente(f);
    } catch {
      setFrente(null);
    }
  }

  function notifyStatsUpdate() {
    window.dispatchEvent(new Event("estrutura-atualizada"));
  }

  useEffect(() => {
    refreshFila().catch((err) => {
      setError(err instanceof Error ? err.message : String(err));
    });
  }, []);

  async function runAction(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await action();
      await refreshFila();
      notifyStatsUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page page-queue">
      <div className="page-header">
        <h2>Fila</h2>
        <span className="hint-chip">FIFO</span>
      </div>

      <section className="panel">
        <div className="structure-title">Visual da fila</div>
        <div className="queue-flow-labels">
          <span>FRENTE</span>
          <span>FIM</span>
        </div>
        <div
          className="queue-track"
          role="img"
          aria-label="Fila horizontal com frente sinalizada"
        >
          {itens.length === 0 && <div className="empty-state">Fila vazia</div>}
          {itens.map((item, idx) => (
            <div
              key={`${String(item)}-${idx}`}
              className={`queue-item ${idx === 0 ? "queue-front" : ""}`}
            >
              <span>{String(item)}</span>
              {idx === 0 && <span className="marker">FRENTE</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="panel controls-grid">
        <form
          className="inline-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!valor.trim()) return;
            await runAction(async () => {
              await addFila(valor.trim());
              setValor("");
            });
          }}
        >
          <input
            className="text-input"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Item para enfileirar"
            disabled={busy}
          />
          <button className="btn btn-primary" type="submit" disabled={busy}>
            Enfileirar
          </button>
        </form>

        <div className="actions-row">
          <button
            className="btn"
            disabled={busy}
            onClick={() => runAction(async () => deleteFrente())}
          >
            Remover frente
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={() => runAction(async () => deleteFila())}
          >
            Limpar fila
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                const f = await getFrente();
                setFrente(f);
              } catch (err) {
                setFrente(null);
                setError(err instanceof Error ? err.message : String(err));
              } finally {
                setBusy(false);
              }
            }}
          >
            Consultar frente
          </button>
        </div>

        <div className="result-strip">
          <strong>Frente atual:</strong>{" "}
          {frente === null ? "(vazia)" : String(frente)}
        </div>
        {busy && <div className="status-info">Processando operacao...</div>}
        {error && <div className="status-error">{error}</div>}
      </section>
    </div>
  );
}

export default FilaPage;
