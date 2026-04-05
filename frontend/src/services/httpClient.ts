const base = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export async function request<T>(path: string, opts?: RequestInit): Promise<T> {
  const url = `${base}${path.startsWith('/') ? path : '/' + path}`;
  try {
    const res = await fetch(url, opts);
    let json: any = null;

    try { json = await res.json(); 
        
    } catch { /* no JSON body */ }
    if (!res.ok) throw new Error(json?.message ?? `Request failed (${res.status})`);
    return json?.data as T;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(msg);
  }
}

export const get = <T>(path: string) => request<T>(path, { method: 'GET' });
export const post = <T, B = unknown>(path: string, body?: B) =>
  request<T>(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
export const del = <T>(path: string) => request<T>(path, { method: 'DELETE' });