import {Router} from 'express';
import { addToStack, clearStack, getAllStack, getStackTop, removeFromStack } from '../controllers/StackController';

const router = Router();

router.post("/api/pilha", addToStack);
router.delete("/api/pilha", removeFromStack);
router.get("/api/pilha/topo", getStackTop);
router.get("/api/pilha", getAllStack);
router.delete("/api/pilha/limpar", clearStack);

export default router;