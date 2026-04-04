import { queueInstance } from '../models/instances';
import { Request, Response } from 'express';

export function addToQueue(req: Request, res: Response) {
    const body = req.body as { item?: unknown; value?: unknown } | undefined;
    const item = body?.item ?? body?.value;

    if (item === undefined) {
        return res.status(400).json({ success: false, message: 'Valor nao informado.' });
    }

    queueInstance.add(item);
    return res.status(201).json({ success: true, message: 'Item adicionado ao final da fila.' });
}

export function removeFromQueue(req: Request, res: Response) {
    const removed = queueInstance.remove();

    if (removed === undefined) {
        return res.status(400).json({ success: false, message: 'Fila vazia. Nada para remover.' });
    }

    return res.json({ success: true, message: 'Item removido da frente da fila.', data: removed });
}

export function getQueueFront(req: Request, res: Response) {
    const front = queueInstance.peek();

    if (front === undefined) {
        return res.status(404).json({ success: false, message: 'Fila vazia.' });
    }

    return res.json({ success: true, data: front });
}

export function getAllQueue(req: Request, res: Response) {
    return res.json({ success: true, data: queueInstance.getItems() });
}

export function clearQueue(req: Request, res: Response) {
    queueInstance.clear();
    return res.json({ success: true, message: 'Fila limpa com sucesso!' });
}
