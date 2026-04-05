"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LinearStructure_1 = __importDefault(require("./models/LinearStructure"));
const instances_1 = require("./models/instances");
const listRoutes_1 = __importDefault(require("./routes/listRoutes"));
const queueRoutes_1 = __importDefault(require("./routes/queueRoutes"));
const stackRoutes_1 = __importDefault(require("./routes/stackRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(stackRoutes_1.default);
app.use(queueRoutes_1.default);
app.use(listRoutes_1.default);
app.use((err, _req, res, next) => {
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
            totalEstruturasCriadas: LinearStructure_1.default.getCreatedStructures(),
            pilha: {
                nome: instances_1.stackInstance.name,
                id: instances_1.stackInstance.getId(),
                tamanho: instances_1.stackInstance.getSize(),
                itens: instances_1.stackInstance.getItems()
            },
            fila: {
                nome: instances_1.queueInstance.name,
                id: instances_1.queueInstance.getId(),
                tamanho: instances_1.queueInstance.getSize(),
                itens: instances_1.queueInstance.getItems()
            },
            lista: {
                nome: instances_1.listStructure.name,
                id: instances_1.listStructure.getId(),
                tamanho: instances_1.listStructure.getSize(),
                itens: instances_1.listStructure.getItems()
            }
        }
    });
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});
//# sourceMappingURL=server.js.map