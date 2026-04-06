import { get, post, del } from "./httpClient";



export async function getPilha(): Promise<unknown[]>{
    return await get<unknown[]>('/api/pilha');
}

export async function addPilha(item: unknown): Promise<void>{
    await post<void, {item: unknown}>('/api/pilha', {item});
}

export async function deleteTopo(): Promise<void>{
    await del<void>('/api/pilha');
}

export async function deletePilha(): Promise<void>{
    await del<void>('/api/pilha/limpar');
}

export async function getTopo(): Promise<unknown>{
    return await get<unknown>('/api/pilha/topo');
}