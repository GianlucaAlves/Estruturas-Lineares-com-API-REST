# Backend TPI - Estruturas Lineares com API REST

## Visao geral

Este projeto implementa uma API REST em Node.js + TypeScript para manipulacao de tres estruturas de dados lineares em memoria:

- Pilha (LIFO)
- Fila (FIFO)
- Lista (acesso por indice)

O backend expoe endpoints HTTP para inserir, remover, consultar elementos e limpar cada estrutura. Tambem existe um endpoint de estatisticas gerais da aplicacao.

## Objetivo do projeto

O objetivo principal e demonstrar conceitos de:

- Programacao orientada a objetos (heranca, abstracao e interface)
- Estruturas de dados lineares
- Organizacao em camadas (rotas, controllers e models)
- Criacao de API REST com Express
- Uso de TypeScript com tipagem estatica

## Tecnologias

- Node.js
- TypeScript
- Express
- ts-node-dev (ambiente de desenvolvimento)

## Arquitetura

O projeto segue uma arquitetura simples em camadas:

1. Rotas (`src/routes`): definem os caminhos HTTP e delegam para controllers.
2. Controllers (`src/controllers`): fazem validacoes de entrada, executam operacoes e retornam respostas HTTP.
3. Models (`src/models`): implementam a regra de negocio e o comportamento das estruturas de dados.
4. Bootstrap do servidor (`src/server.ts`): configura Express, middlewares, rotas e inicializa o servidor.

### Estrutura de pastas

```text
backend-TPI/
  src/
    server.ts
    controllers/
      ListController.ts
      QueueController.ts
      StackController.ts
    models/
      instances.ts
      LinearStructure.ts
      ListStructure.ts
      Queue.ts
      Stack.ts
      interfaces/
        ILinearStructure.ts
    routes/
      listRoutes.ts
      queueRoutes.ts
      stackRoutes.ts
```

## Funcionamento interno

### 1) Camada de modelo

#### `LinearStructure<T>`

Classe abstrata base para todas as estruturas lineares. Responsavel por:

- Armazenar itens em array (`items`)
- Registrar nome da estrutura (`name`)
- Gerar identificador unico (`id`) para cada instancia
- Manter contador estatico de estruturas criadas (`createdStructures`)

Metodos implementados na classe base:

- `add(item)`
- `clear()`
- `getSize()`
- `getItems()` (retorna copia do array)
- `getId()`
- `LinearStructure.getCreatedStructures()`

Metodos abstratos (implementados pelas classes filhas):

- `remove()`
- `peek()`

#### `Stack<T>` (Pilha)

- `remove()` usa `pop()` (remove do topo)
- `peek()` retorna o topo (`items[length - 1]`)

#### `Queue<T>` (Fila)

- `remove()` usa `shift()` (remove da frente)
- `peek()` retorna o primeiro elemento (`items[0]`)

#### `ListStructure<T>` (Lista)

- `remove()` remove o ultimo (`pop()`)
- `peek()` retorna o ultimo item
- `getAt(index)` retorna item por indice
- `removeAt(index)` remove item por indice (com validacao de limite)

#### `instances.ts`

Cria instancias unicas em memoria e exporta para uso em toda API:

- `stackInstance`
- `queueInstance`
- `listStructure`

Isso significa que os dados sao compartilhados entre todas as requisicoes enquanto o servidor estiver ativo.

### 2) Camada de controllers

Cada controller:

- Le o corpo/parametros da requisicao
- Valida entradas (ex.: valor ausente, indice invalido)
- Chama o model correspondente
- Retorna JSON padronizado com `success`, `message` e/ou `data`

#### Convencoes de validacao

- Valor nao informado para insercao: `400 Bad Request`
- Estrutura vazia em operacao de remocao: `400 Bad Request`
- Estrutura vazia em consulta de topo/frente/ultimo: `404 Not Found`
- Indice invalido (nao numerico): `400 Bad Request`
- Indice fora do intervalo: `404 Not Found`

### 3) Camada de rotas

As rotas estao separadas por recurso:

- `stackRoutes.ts` -> `/api/pilha`
- `queueRoutes.ts` -> `/api/fila`
- `listRoutes.ts` -> `/api/lista`

No `server.ts`, esses routers sao registrados com `app.use(...)`.

### 4) Servidor e middleware

No arquivo `src/server.ts`:

- `express.json()` habilita parse de JSON no corpo
- Middleware de erro trata JSON invalido no corpo e responde com `400`
- Endpoint de estatisticas `GET /api/estatisticas`
- Servidor sobe na porta `3001`

## Persistencia de dados

Os dados sao mantidos apenas em memoria. Em outras palavras:

- Ao reiniciar o servidor, as estruturas voltam vazias.
- Nao ha banco de dados neste projeto.

## Endpoints

### Pilha (`/api/pilha`)

- `POST /api/pilha`
  - Body: `{ "item": qualquer }` ou `{ "value": qualquer }`
  - Acao: adiciona no topo

- `DELETE /api/pilha`
  - Acao: remove do topo

- `GET /api/pilha/topo`
  - Acao: consulta o topo

- `GET /api/pilha`
  - Acao: lista todos os itens da pilha

- `DELETE /api/pilha/limpar`
  - Acao: limpa a pilha

### Fila (`/api/fila`)

- `POST /api/fila`
  - Body: `{ "item": qualquer }` ou `{ "value": qualquer }`
  - Acao: adiciona no final da fila

- `DELETE /api/fila`
  - Acao: remove da frente

- `GET /api/fila/frente`
  - Acao: consulta item da frente

- `GET /api/fila`
  - Acao: lista todos os itens da fila

- `DELETE /api/fila/limpar`
  - Acao: limpa a fila

### Lista (`/api/lista`)

- `POST /api/lista`
  - Body: `{ "item": qualquer }` ou `{ "value": qualquer }`
  - Acao: adiciona no final da lista

- `DELETE /api/lista`
  - Acao: remove o ultimo item

- `GET /api/lista/ultimo`
  - Acao: consulta o ultimo item

- `GET /api/lista`
  - Acao: lista todos os itens

- `GET /api/lista/:index`
  - Acao: consulta item por indice

- `DELETE /api/lista/:index`
  - Acao: remove item por indice

- `DELETE /api/lista/limpar`
  - Acao: limpa a lista

### Estatisticas (`/api/estatisticas`)

- `GET /api/estatisticas`
  - Retorna:
    - `totalEstruturasCriadas`
    - dados de pilha, fila e lista (`nome`, `id`, `tamanho`, `itens`)

## Formato de resposta

As respostas seguem um padrao JSON semelhante a:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Nem todos os campos aparecem em todas as respostas. Por exemplo, operacoes de listagem podem retornar apenas `success` e `data`.

## Como executar

### Pre-requisitos

- Node.js instalado
- npm instalado

### Instalacao

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Servidor: `http://localhost:3001`

### Build de producao

```bash
npm run build
```

### Execucao da build

```bash
npm start
```

### Conferir tipos (TypeScript)

```bash
npm run type-check
```


