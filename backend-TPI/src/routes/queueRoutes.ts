import { Router } from 'express';
import {
    addToQueue,
    clearQueue,
    getAllQueue,
    getQueueFront,
    removeFromQueue
} from '../controllers/QueueController';

const router = Router();

router.post('/api/fila', addToQueue);
router.delete('/api/fila', removeFromQueue);
router.get('/api/fila/frente', getQueueFront);
router.get('/api/fila', getAllQueue);
router.delete('/api/fila/limpar', clearQueue);

export default router;
