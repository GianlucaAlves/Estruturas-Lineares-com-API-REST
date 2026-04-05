import {get} from './httpClient';
import {type Estatisticas} from '../types/estruturas';

 export async function getEstatisticas(): Promise<Estatisticas>{
    const res = await get<Estatisticas>('/api/estatisticas');
    return res;

}