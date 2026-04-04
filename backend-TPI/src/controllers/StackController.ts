import { stackInstance } from '../models/instances';
import { Request, Response } from 'express';

export function addToStack(req: Request, res: Response) {
    const body = req.body as { item?: unknown; value?: unknown } | undefined;
    const value = body?.item ?? body?.value;

    if (value === undefined) {
        return res.status(400).json({ success: false, message: "Valor não informado." });
    }

    stackInstance.add(value);
    res.status(201).json({ success: true, message: "Item adicionado ao topo da pilha." });
}

export function removeFromStack(req: Request, res: Response) {
    const removed = stackInstance.remove();
    if (removed === undefined) {
        return res.status(400).json({ success: false, message: "Pilha vazia. Nada para remover." });
    }
    res.json({ success: true, message: "Item removido da pilha.", data: removed });
}

export function getStackTop(req: Request, res: Response) {
    const stackTop = stackInstance.peek();
    if (stackTop === undefined) {
        return res.status(404).json({ success: false, message: "Pilha vazia." });
    }
    res.json({ success: true, data: stackTop });
}

export function getAllStack(req: Request, res: Response) {
    const stack = stackInstance.getItems();
    res.json({ success: true, data: stack });
}

export function clearStack(req: Request, res: Response) {
    stackInstance.clear();
    res.json({ success: true, message: "Pilha limpa com sucesso!" });
}