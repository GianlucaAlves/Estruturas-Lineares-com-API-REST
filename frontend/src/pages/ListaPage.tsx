import { 
    getLista,
    getById 
}     from "../services/listaService";

function ListaPage(){
    const [itens, setItens] = useState<unknown[]>([]);
    const [valor, setValor] = useState("");
    const [frente, setFrente] = useState<unknown | null>(null);

    return (
        <h2>Lista Page</h2>
    )
}

export default ListaPage;