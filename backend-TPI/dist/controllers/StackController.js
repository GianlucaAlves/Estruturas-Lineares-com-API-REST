"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToStack = addToStack;
exports.removeFromStack = removeFromStack;
exports.getStackTop = getStackTop;
exports.getAllStack = getAllStack;
exports.clearStack = clearStack;
const instances_1 = require("../models/instances");
function addToStack(req, res) {
    const body = req.body;
    const value = body?.item ?? body?.value;
    if (value === undefined) {
        return res.status(400).json({ success: false, message: "Valor não informado." });
    }
    instances_1.stackInstance.add(value);
    res.status(201).json({ success: true, message: "Item adicionado ao topo da pilha." });
}
function removeFromStack(req, res) {
    const removed = instances_1.stackInstance.remove();
    if (removed === undefined) {
        return res.status(400).json({ success: false, message: "Pilha vazia. Nada para remover." });
    }
    res.json({ success: true, message: "Item removido da pilha.", data: removed });
}
function getStackTop(req, res) {
    const stackTop = instances_1.stackInstance.peek();
    if (stackTop === undefined) {
        return res.status(404).json({ success: false, message: "Pilha vazia." });
    }
    res.json({ success: true, data: stackTop });
}
function getAllStack(req, res) {
    const stack = instances_1.stackInstance.getItems();
    res.json({ success: true, data: stack });
}
function clearStack(req, res) {
    instances_1.stackInstance.clear();
    res.json({ success: true, message: "Pilha limpa com sucesso!" });
}
//# sourceMappingURL=StackController.js.map