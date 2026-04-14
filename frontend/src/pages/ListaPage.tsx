import { useEffect, useState } from "react";
import {
  addLista,
  deleteById,
  deleteLista,
  deleteUltimo,
  getById,
  getLista,
  getUltimo,
} from "../services/listaService";

function ListaPage() {
  const [itens, setItens] = useState<unknown[]>([]);
  const [valor, setValor] = useState("");
  const [indice, setIndice] = useState("");
  const [ultimo, setUltimo] = useState<unknown | null>(null);
  const [itemPorIndice, setItemPorIndice] = useState<unknown | null>(null);
  const [indiceSelecionado, setIndiceSelecionado] = useState<number | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshLista() {
    const dados = await getLista();
    setItens(dados);
    try {
      const u = await getUltimo();
      setUltimo(u);
    } catch {
      setUltimo(null);
    }
  }

  function notifyStatsUpdate() {
    window.dispatchEvent(new Event("estrutura-atualizada"));
  }

  useEffect(() => {
    refreshLista().catch((err) => {
      setError(err instanceof Error ? err.message : String(err));
    });
  }, []);

  async function runAction(action: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await action();
      await refreshLista();
      notifyStatsUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  function parseIndice(): number | null {
    const parsed = Number(indice);
    if (!Number.isInteger(parsed) || parsed < 0) {
      setError("Indice invalido. Use um numero inteiro >= 0.");
      return null;
    }
    return parsed;
  }

  return (
    <div className="page page-list">
      <div className="page-header">
        <h2>Lista</h2>
        <span className="hint-chip">Indice</span>
      </div>

      <section className="panel">
        <div className="structure-title">Visual da lista</div>
        <div
          className="list-canvas"
          role="img"
          aria-label="Lista com indices visiveis"
        >
          {itens.length === 0 && <div className="empty-state">Lista vazia</div>}
          {itens.map((item, idx) => (
            <div
              key={`${String(item)}-${idx}`}
              className={`list-item ${idx === indiceSelecionado ? "list-highlight" : ""} ${
                idx === itens.length - 1 ? "list-last" : ""
              }`}
            >
              <span className="list-index">[{idx}]</span>
              <span className="list-value">{String(item)}</span>
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
              await addLista(valor.trim());
              setValor("");
              setIndiceSelecionado(null);
              setItemPorIndice(null);
            });
          }}
        >
          <input
            className="text-input"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Item para inserir"
            disabled={busy}
          />
          <button className="btn btn-primary" type="submit" disabled={busy}>
            Inserir
          </button>
        </form>

        <div className="actions-row">
          <button
            className="btn"
            disabled={busy}
            onClick={() => runAction(async () => deleteUltimo())}
          >
            Remover ultimo
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              setError(null);
              try {
                const u = await getUltimo();
                setUltimo(u);
                setIndiceSelecionado(
                  itens.length > 0 ? itens.length - 1 : null,
                );
              } catch (err) {
                setUltimo(null);
                setIndiceSelecionado(null);
                setError(err instanceof Error ? err.message : String(err));
              } finally {
                setBusy(false);
              }
            }}
          >
            Consultar ultimo
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={() =>
              runAction(async () => {
                await deleteLista();
                setUltimo(null);
                setItemPorIndice(null);
                setIndiceSelecionado(null);
              })
            }
          >
            Limpar lista
          </button>
        </div>

        <div className="inline-form">
          <input
            className="text-input"
            type="number"
            min={0}
            value={indice}
            onChange={(e) => setIndice(e.target.value)}
            placeholder="Indice"
            disabled={busy}
          />
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              const parsed = parseIndice();
              if (parsed === null) return;

              setBusy(true);
              setError(null);
              try {
                const item = await getById(String(parsed));
                setItemPorIndice(item);
                setIndiceSelecionado(parsed);
              } catch (err) {
                setItemPorIndice(null);
                setIndiceSelecionado(null);
                setError(err instanceof Error ? err.message : String(err));
              } finally {
                setBusy(false);
              }
            }}
          >
            Consultar indice
          </button>
          <button
            className="btn"
            disabled={busy}
            onClick={async () => {
              const parsed = parseIndice();
              if (parsed === null) return;

              await runAction(async () => {
                await deleteById(String(parsed));
                setItemPorIndice(null);
                setIndiceSelecionado(null);
              });
            }}
          >
            Remover indice
          </button>
        </div>

        <div className="result-strip">
          <strong>Ultimo:</strong>{" "}
          {ultimo === null ? "(vazio)" : String(ultimo)}
        </div>
        <div className="result-strip">
          <strong>Item por indice:</strong>{" "}
          {itemPorIndice === null ? "(nenhum)" : String(itemPorIndice)}
        </div>
        {busy && <div className="status-info">Processando operacao...</div>}
        {error && <div className="status-error">{error}</div>}
      </section>
    </div>
  );
}

export default ListaPage;
