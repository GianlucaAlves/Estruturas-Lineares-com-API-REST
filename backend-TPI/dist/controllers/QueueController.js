"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToQueue = addToQueue;
exports.removeFromQueue = removeFromQueue;
exports.getQueueFront = getQueueFront;
exports.getAllQueue = getAllQueue;
exports.clearQueue = clearQueue;
const instances_1 = require("../models/instances");
function addToQueue(req, res) {
    const body = req.body;
    const item = body?.item ?? body?.value;
    if (item === undefined) {
        return res.status(400).json({ success: false, message: 'Valor nao informado.' });
    }
    instances_1.queueInstance.add(item);
    return res.status(201).json({ success: true, message: 'Item adicionado ao final da fila.' });
}
function removeFromQueue(req, res) {
    const removed = instances_1.queueInstance.remove();
    if (removed === undefined) {
        return res.status(400).json({ success: false, message: 'Fila vazia. Nada para remover.' });
    }
    return res.json({ success: true, message: 'Item removido da frente da fila.', data: removed });
}
function getQueueFront(req, res) {
    const front = instances_1.queueInstance.peek();
    if (front === undefined) {
        return res.status(404).json({ success: false, message: 'Fila vazia.' });
    }
    return res.json({ success: true, data: front });
}
function getAllQueue(req, res) {
    return res.json({ success: true, data: instances_1.queueInstance.getItems() });
}
function clearQueue(req, res) {
    instances_1.queueInstance.clear();
    return res.json({ success: true, message: 'Fila limpa com sucesso!' });
}
//# sourceMappingURL=QueueController.js.map