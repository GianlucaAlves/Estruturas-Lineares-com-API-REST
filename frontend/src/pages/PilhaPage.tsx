import { useEffect, useState } from "react";
import { getPilha, addPilha, deleteTopo, deletePilha, getTopo } from "../services/pilhaService";


function PilhaPage() {
  const [itens, setItens] = useState<unknown[]>([]);
  const [valor, setValor] = useState('');
  const [topo, setTopo] = useState<unknown | null>(null);
  
  useEffect(() => {
    async function fetchItens() {
      const dados = await getPilha();
      setItens(dados);
    }
    fetchItens();
  }, []);

  return (
    <div>
      <h2>Pilha Page</h2>
      <section>
      <ul>
        {itens.slice().reverse().map((item, idx ) => (
          <li key={idx}>{String(item)}</li>
        ))}
      </ul>
      </section>


      <form onSubmit={async (e) => {
        e.preventDefault();
        await addPilha(valor);
        setValor('');
        const dados = await getPilha();
        setItens(dados);
        try{   
            const t = await getTopo();
            setTopo(t);
        }catch{
            setTopo(null);
        }    
      }}>
        <input value = {valor} onChange={e => setValor(e.target.value)}></input>
        <button type="submit">Adicionar</button>
      </form>


      <div>
      <button onClick={async () => {
        await deleteTopo();
        const dados = await getPilha();
        setItens(dados);
        try{   
            const t = await getTopo();
            setTopo(t);
        }catch{
            setTopo(null);
        }    
      }}>Deletar topo</button>
      
      
      <button onClick={async () => {
        await deletePilha();
        const dados = await getPilha();
        setItens(dados);
        try{   
            const t = await getTopo();
            setTopo(t);
        }catch{
            setTopo(null);
        }    
      }}>Deletar pilha</button>
      
      
      <button onClick={async () => {
        try{   
            const t = await getTopo();
            setTopo(t);
        }catch{
            setTopo(null);
        }    
      }}>Ver topo</button>
      </div>
      {topo !== null && <div>Topo: {String(topo)}</div>}
    </div>
  );
}

export default PilhaPage;
