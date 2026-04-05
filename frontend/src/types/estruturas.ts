export type EstruturaResumo = {
    nome: string,
    id: string,
    tamanho: number,
    itens: unknown[]
}

export type Estatisticas = {
    totalEstruturasCriadas: number,
    pilha: EstruturaResumo,
    fila: EstruturaResumo,
    lista: EstruturaResumo
}