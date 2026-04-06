import { useEffect, useState } from "react";
import {
  getFila,
  addFila,
  deleteFila,
  deleteFrente,
  getFrente,
} from "../services/filaService";

function FilaPage() {
  const [itens, setItens] = useState<unknown[]>([]);
  const [valor, setValor] = useState("");
  const [frente, setFrente] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchItens() {
      const dados = await getFila();
      setItens(dados);
    }
    fetchItens();
  }, []);

  return (
    <div>
      <h2>Fila Page</h2>
      <section>
        <ul
          style={{
            display: "flex",
            gap: 10,
            listStyle: "none",
            padding: "10px 12px",
          }}
        >
          {itens.slice().reverse().map((item, idx) => (
            <li
              style={{
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: "8px 16px",
                background:  "#fff", // destaca a frente
                fontWeight:"bold",
              }}
              key={idx}
            >
              {String(item)}
              
            </li>
          ))}
        </ul>
      </section>

      <section>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await addFila(valor);
            setValor("");
            const dados = await getFila();
            setItens(dados);
            try {
              const frente = await getFrente();
              setFrente(frente);
            } catch {
              setFrente(null);
            }
          }}
        >
          <input
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          ></input>
          <button type="submit">Adicionar</button>
        </form>
        <div>
          <button onClick={async () => {
            await deleteFrente();
            const dados = await getFila();
            setItens(dados);
            try{
                const frente = await getFrente();
                setFrente(frente);
            }catch{
                setFrente(null);
            }            
          }}>Deletar frente</button>
          <button onClick={async () => {
            await deleteFila();
            const dados = await getFila();
            setItens(dados);
            setFrente(null);
          }}>Deleter fila</button>
          <button onClick={async () => {
           try{
            const frente = await getFrente();
            setFrente(frente);
           }catch{
            setFrente(null);
           }           
          }}>Ver frente</button>
          {frente !== null && <div>Frente: {String(frente)}</div> } 
        </div>
      </section>
    </div>
  );
}

export default FilaPage;
