import { listStructure } from '../models/instances';
import { Request, Response } from 'express';

export function addToList(req: Request, res: Response) {
    const body = req.body as { item?: unknown; value?: unknown } | undefined;
    const value = body?.item ?? body?.value;

    if (value === undefined) {
        return res.status(400).json({ success: false, message: 'Valor nao informado.' });
    }

    listStructure.add(value);
    return res.status(201).json({ success: true, message: 'Item adicionado ao final da lista.' });
}

export function removeFromList(req: Request, res: Response) {
    const removed = listStructure.remove();

    if (removed === undefined) {
        return res.status(400).json({ success: false, message: 'Lista vazia. Nada para remover.' });
    }

    return res.json({ success: true, message: 'Ultimo item removido da lista.', data: removed });
}

export function getListLast(req: Request, res: Response) {
    const last = listStructure.peek();

    if (last === undefined) {
        return res.status(404).json({ success: false, message: 'Lista vazia.' });
    }

    return res.json({ success: true, data: last });
}

export function getAllList(req: Request, res: Response) {
    return res.json({ success: true, data: listStructure.getItems() });
}

export function getListAt(req: Request, res: Response) {
    const index = Number(req.params.index);

    if (Number.isNaN(index)) {
        return res.status(400).json({ success: false, message: 'Indice invalido.' });
    }

    const item = listStructure.getAt(index);

    if (item === undefined) {
        return res.status(404).json({ success: false, message: 'Indice fora do intervalo.' });
    }

    return res.json({ success: true, data: item });
}

export function removeListAt(req: Request, res: Response) {
    const index = Number(req.params.index);

    if (Number.isNaN(index)) {
        return res.status(400).json({ success: false, message: 'Indice invalido.' });
    }

    const removed = listStructure.removeAt(index);

    if (removed === undefined) {
        return res.status(404).json({ success: false, message: 'Indice fora do intervalo.' });
    }

    return res.json({ success: true, message: 'Item removido do indice informado.', data: removed });
}

export function clearList(req: Request, res: Response) {
    listStructure.clear();
    return res.json({ success: true, message: 'Lista limpa com sucesso!' });
}
