import { Router } from 'express';
import {
    addToList,
    clearList,
    getAllList,
    getListAt,
    getListLast,
    removeFromList,
    removeListAt
} from '../controllers/ListController';

const router = Router();

router.post('/api/lista', addToList);
router.delete('/api/lista', removeFromList);
router.get('/api/lista/ultimo', getListLast);
router.get('/api/lista', getAllList);
router.get('/api/lista/:index', getListAt);
router.delete('/api/lista/limpar', clearList);
router.delete('/api/lista/:index', removeListAt);

export default router;
