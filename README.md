# EleitorAI

<!-- portfolio
cover: Eleitor
highlight: AI
featured: true
order: 1
tone: blue
title: EleitorAI — a RAG assistant for Brazilian elections
title.pt: EleitorAI — um assistente RAG para as eleições brasileiras
title.es: EleitorAI — un asistente RAG para las elecciones brasileñas
description: Side project that answers voters' questions about parties, candidates and government plans, grounded in the source documents. Layered API (domain → use cases → HTTP), document ingestion with configurable chunking, and tests at unit, integration and HTTP level.
description.pt: Projeto pessoal que responde dúvidas de eleitores sobre partidos, candidatos e planos de governo, com base nos documentos originais. API em camadas (domínio → casos de uso → HTTP), ingestão de documentos com chunking configurável e testes de unidade, integração e HTTP.
description.es: Proyecto personal que responde preguntas de los votantes sobre partidos, candidatos y planes de gobierno, basándose en los documentos originales. API en capas (dominio → casos de uso → HTTP), ingesta de documentos con chunking configurable y pruebas unitarias, de integración y HTTP.
status: In progress
status.pt: Em andamento
status.es: En curso
stack: TypeScript, Fastify, Drizzle, Postgres + pgvector, Vitest, Next.js
-->


Plataforma para consulta e análise de candidatos, propostas e planos de
governo utilizando IA.

## Stack

-   Next.js
-   React
-   React Compiler
-   TypeScript
-   Fastify
-   Zod
-   PostgreSQL
-   pgvector
-   Drizzle ORM
-   Docker
-   Vitest
-   ESLint
-   Prettier
-   GitHub Actions

## Estrutura

``` text
eleitor-ai/
├── .github/
│   └── workflows/
│       └── ci.yml
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   └── shared/
├── .gitignore
├── .prettierignore
├── .prettierrc
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

## Requisitos

Antes de iniciar, instale:

-   Node.js 22+
-   npm
-   Docker

## Instalação

Clone o repositório:

``` bash
git clone <repository-url>
cd eleitor-ai
```

Instale as dependências:

``` bash
npm install
```

Configure as variáveis de ambiente da API:

``` bash
cp apps/api/.env.example apps/api/.env
```

No Windows PowerShell, use:

``` powershell
Copy-Item apps/api/.env.example apps/api/.env
```

## Banco de dados

Suba o PostgreSQL com pgvector:

``` bash
docker compose up -d
```

Verifique o status:

``` bash
docker compose ps
```

O container do PostgreSQL deve aparecer como `healthy`.

Execute as migrations:

``` bash
npm run db:migrate --workspace=@eleitor-ai/api
```

Para interromper os containers:

``` bash
docker compose down
```

Para interromper os containers e remover os dados persistidos:

``` bash
docker compose down -v
```

> O comando `docker compose down -v` remove o volume do PostgreSQL e,
> consequentemente, os dados locais do banco.

## Desenvolvimento

### API

Execute a API:

``` bash
npm run dev --workspace=@eleitor-ai/api
```

A API estará disponível em:

``` text
http://localhost:3001
```

Health check:

``` text
GET http://localhost:3001/health
```

Resposta esperada:

``` json
{
  "status": "ok",
  "environment": "development"
}
```

### Web

Em outro terminal:

``` bash
npm run dev --workspace=@eleitor-ai/web
```

O frontend estará disponível em:

``` text
http://localhost:3000
```

## Comandos da API

### Desenvolvimento

``` bash
npm run dev --workspace=@eleitor-ai/api
```

### Typecheck

``` bash
npm run typecheck --workspace=@eleitor-ai/api
```

### Lint

``` bash
npm run lint --workspace=@eleitor-ai/api
```

### Testes

``` bash
npm test --workspace=@eleitor-ai/api
```

### Testes em modo watch

``` bash
npm run test:watch --workspace=@eleitor-ai/api
```

### Build

``` bash
npm run build --workspace=@eleitor-ai/api
```

### Executar build

``` bash
npm run start --workspace=@eleitor-ai/api
```

## Banco de dados e migrations

O schema do banco fica em:

``` text
apps/api/src/db/schema.ts
```

Para gerar uma migration a partir das alterações do schema:

``` bash
npm run db:generate --workspace=@eleitor-ai/api
```

Para executar as migrations:

``` bash
npm run db:migrate --workspace=@eleitor-ai/api
```

As migrations ficam em:

``` text
apps/api/src/db/migrations/
```

## CI

O projeto possui GitHub Actions configurado em:

``` text
.github/workflows/ci.yml
```

O pipeline executa:

1.  Instalação das dependências
2.  Typecheck
3.  Lint
4.  Testes
5.  Build

O CI é executado em pushes para `main` e `develop` e em pull requests.

## Variáveis de ambiente

A API utiliza:

``` env
NODE_ENV=development
API_PORT=3001
DATABASE_URL=postgresql://eleitorai:eleitorai@localhost:5432/eleitorai
```

O arquivo `.env` não deve ser versionado.

Use:

``` text
apps/api/.env.example
```

como referência.

## Arquitetura inicial

``` text
                    ┌─────────────────┐
                    │     Next.js     │
                    │   Frontend Web  │
                    └────────┬────────┘
                             │ HTTP
                             ▼
                    ┌─────────────────┐
                    │     Fastify     │
                    │       API       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   + pgvector    │
                    └─────────────────┘
```

A aplicação está sendo construída incrementalmente. A infraestrutura de
pgvector está preparada para as futuras funcionalidades de embeddings e
busca vetorial, mas a camada de RAG ainda não faz parte da fundação
inicial.

## Sprint 1 --- Fundação

### Concluído

-   [x] Monorepo com npm Workspaces
-   [x] Next.js
-   [x] React Compiler
-   [x] TypeScript
-   [x] Fastify
-   [x] Health check
-   [x] CORS
-   [x] Configuração de ambiente
-   [x] Validação de ambiente com Zod
-   [x] Docker Compose
-   [x] PostgreSQL
-   [x] pgvector
-   [x] Drizzle ORM
-   [x] Migrations
-   [x] ESLint
-   [x] Prettier
-   [x] Vitest
-   [x] GitHub Actions
-   [x] Documentação inicial

## Próximo passo

### Sprint 2 --- Domínio e Persistência

A próxima sprint será dedicada à modelagem do domínio do EleitorAI,
incluindo inicialmente:

-   `Candidate`
-   `Party`
-   `GovernmentPlan`
-   `Document`
-   `Source`

A partir dessa modelagem serão definidos os schemas, migrations,
repositories e APIs correspondentes.
