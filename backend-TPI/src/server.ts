import express from 'express';
import LinearStructure from './models/LinearStructure';
import { listStructure, queueInstance, stackInstance } from './models/instances';
import listRouter from './routes/listRoutes';
import queueRouter from './routes/queueRoutes';
import stackRouter from './routes/stackRoutes';

const app = express();

app.use(express.json());

app.use(stackRouter);
app.use(queueRouter);
app.use(listRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: 'JSON invalido no corpo da requisicao.'
        });
    }

    return next(err);
});

app.get('/api/estatisticas', (_req, res) => {
    return res.json({
        success: true,
        data: {
            totalEstruturasCriadas: LinearStructure.getCreatedStructures(),
            pilha: {
                nome: stackInstance.name,
                id: stackInstance.getId(),
                tamanho: stackInstance.getSize(),
                itens: stackInstance.getItems()
            },
            fila: {
                nome: queueInstance.name,
                id: queueInstance.getId(),
                tamanho: queueInstance.getSize(),
                itens: queueInstance.getItems()
            },
            lista: {
                nome: listStructure.name,
                id: listStructure.getId(),
                tamanho: listStructure.getSize(),
                itens: listStructure.getItems()
            }
        }
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
