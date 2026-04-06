import { get, del, post } from "./httpClient";

export async function getFila(): Promise<unknown[]>{
    return await get<unknown[]>('/api/fila');
}

export async function addFila(item: unknown): Promise<void>{
    await post<void, {item: unknown}>('/api/fila', {item});
}

export async function deleteFrente(): Promise<void>{
    await del<void>('api/fila');
}

export async function deleteFila(): Promise<void> {
    await del<void>('api/fila/limpar');
}

export async function getFrente(){
    return await get<unknown>('/api/fila/frente');
}