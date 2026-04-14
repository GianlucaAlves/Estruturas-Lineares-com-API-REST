import { get, del, post } from "./httpClient";

export async function getLista(): Promise<unknown[]> {
  return await get<unknown[]>("/api/lista");
}

export async function getUltimo(): Promise<unknown> {
  return await get<unknown>("/api/lista/ultimo");
}

export async function getById(id: string): Promise<unknown> {
  return await get<unknown>(`/api/lista/${id}`);
}

export async function addLista(item: unknown): Promise<void> {
  await post<void, { item: unknown }>("/api/lista", { item });
}

export async function deleteLista(): Promise<void> {
  await del<void>("/api/lista/limpar");
}

export async function deleteUltimo(): Promise<void> {
  await del<void>("/api/lista");
}

export async function deleteById(id: string): Promise<void> {
  await del<void>(`/api/lista/${id}`);
}
