"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToList = addToList;
exports.removeFromList = removeFromList;
exports.getListLast = getListLast;
exports.getAllList = getAllList;
exports.getListAt = getListAt;
exports.removeListAt = removeListAt;
exports.clearList = clearList;
const instances_1 = require("../models/instances");
function addToList(req, res) {
    const body = req.body;
    const value = body?.item ?? body?.value;
    if (value === undefined) {
        return res.status(400).json({ success: false, message: 'Valor nao informado.' });
    }
    instances_1.listStructure.add(value);
    return res.status(201).json({ success: true, message: 'Item adicionado ao final da lista.' });
}
function removeFromList(req, res) {
    const removed = instances_1.listStructure.remove();
    if (removed === undefined) {
        return res.status(400).json({ success: false, message: 'Lista vazia. Nada para remover.' });
    }
    return res.json({ success: true, message: 'Ultimo item removido da lista.', data: removed });
}
function getListLast(req, res) {
    const last = instances_1.listStructure.peek();
    if (last === undefined) {
        return res.status(404).json({ success: false, message: 'Lista vazia.' });
    }
    return res.json({ success: true, data: last });
}
function getAllList(req, res) {
    return res.json({ success: true, data: instances_1.listStructure.getItems() });
}
function getListAt(req, res) {
    const index = Number(req.params.index);
    if (Number.isNaN(index)) {
        return res.status(400).json({ success: false, message: 'Indice invalido.' });
    }
    const item = instances_1.listStructure.getAt(index);
    if (item === undefined) {
        return res.status(404).json({ success: false, message: 'Indice fora do intervalo.' });
    }
    return res.json({ success: true, data: item });
}
function removeListAt(req, res) {
    const index = Number(req.params.index);
    if (Number.isNaN(index)) {
        return res.status(400).json({ success: false, message: 'Indice invalido.' });
    }
    const removed = instances_1.listStructure.removeAt(index);
    if (removed === undefined) {
        return res.status(404).json({ success: false, message: 'Indice fora do intervalo.' });
    }
    return res.json({ success: true, message: 'Item removido do indice informado.', data: removed });
}
function clearList(req, res) {
    instances_1.listStructure.clear();
    return res.json({ success: true, message: 'Lista limpa com sucesso!' });
}
//# sourceMappingURL=ListController.js.map