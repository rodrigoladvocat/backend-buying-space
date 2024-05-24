
# Buying Space API
API de plataforma de e-commerce desenvolvida com NestJS, TypeScript, Prisma ORM e SQLite. A API permite gerenciar produtos, usuários, carrinhos de compra e outras funcionalidades essenciais para um sistema de e-commerce.

## Tecnologias utilizadas

 - **NestJS** - Framework de Node.JS utilizada para desenvolver aplicações server-side escaláveis e eficientes.

 - **Typescript** - Superconjunto de JavaScript que adiciona tipagem estática ao código.

 - **Prisma** - ORM para Node.JS e Typescript.

 - **SQLite** - Banco de dados SQL leve e autônomo.


## Pré-requisitos

Certifique-se de que tem o seguinte instalado em sua máquina:

- Node.js
- npm (ou yarn, ou pnpm)
## Rodando localmente

Clone o repositório:

```bash
git clone https://github.com/rodrigoladvocat/backend-buying-space.git
cd backend-buying-space
```

Instale as dependências de build:
```bash
npm install
```

Realize as migrações do banco de dados:
```bash
npx prisma migrate dev
```

A base de dados ```dev.db``` será criada na pasta prisma.

Para iniciar o servidor de desenvolvimento:

```bash
npm run start:dev
```

A API estará disponível em http://localhost:3000.

Para iniciar o estúdio do Prisma ORM:
```bash
npx prisma studio
```

## Descrição da API

Com o servidor de desenvolvimento rodando, acesse http://localhost:3000/api para visualizar a documentação da API, gerada com Swagger. Esta documentação fornece detalhes sobre todas as rotas disponíveis, os parâmetros esperados e as respostas possíveis.



## Licença

[MIT](https://choosealicense.com/licenses/mit/)

