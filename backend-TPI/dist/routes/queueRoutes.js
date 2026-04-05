"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QueueController_1 = require("../controllers/QueueController");
const router = (0, express_1.Router)();
router.post('/api/fila', QueueController_1.addToQueue);
router.delete('/api/fila', QueueController_1.removeFromQueue);
router.get('/api/fila/frente', QueueController_1.getQueueFront);
router.get('/api/fila', QueueController_1.getAllQueue);
router.delete('/api/fila/limpar', QueueController_1.clearQueue);
exports.default = router;
//# sourceMappingURL=queueRoutes.js.map