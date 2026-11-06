# biblioteca-backend
 projetobeckend1
# Biblioteca Back-End

Sistema de gerenciamento de biblioteca desenvolvido como projeto acadêmico da disciplina de Programação Web Back-End.

## 1. Objetivo

Desenvolver uma aplicação back-end para gerenciar usuários, livros, empréstimos e avaliações de livros, utilizando Node.js, Express, PostgreSQL e MongoDB.

## 2. Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- MongoDB
- Mongoose
- JavaScript
- HTML e CSS

## 3. Bancos de dados

### PostgreSQL

Utilizado para armazenar os dados estruturados do sistema:

- Usuários;
- Livros;
- Empréstimos.

O PostgreSQL foi escolhido porque permite trabalhar com relacionamentos entre tabelas, chaves estrangeiras e integridade referencial.

### MongoDB

Utilizado para armazenar as avaliações dos livros.

O MongoDB foi escolhido por trabalhar com documentos, oferecendo flexibilidade para armazenar informações como nota, comentário e data da avaliação.

As avaliações armazenadas no MongoDB utilizam os IDs dos usuários e livros cadastrados no PostgreSQL para relacionar os documentos aos respectivos registros.

## 4. Funcionalidades

- Cadastro, consulta, atualização e exclusão de usuários.
- Cadastro, consulta, atualização e exclusão de livros.
- Cadastro e gerenciamento de empréstimos.
- Controle da disponibilidade dos livros.
- Cadastro, consulta, atualização e exclusão de avaliações.
- Pesquisa de livros por título e autor.
- Filtro por disponibilidade.
- Ordenação de livros.
- Validação de dados.
- Tratamento de erros e registro em arquivo de log.
- Interface web para gerenciamento das funcionalidades do sistema.

## 5. Instalação

É necessário ter Node.js, PostgreSQL e MongoDB instalados.

Na pasta do projeto, execute:

```bash
npm install
```

Configure as variáveis de ambiente no arquivo `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca
DB_USER=postgres
DB_PASSWORD=sua_senha

MONGO_URI=mongodb://127.0.0.1:27017/biblioteca
```

Substitua `sua_senha` pela senha configurada no PostgreSQL do ambiente de execução.

O projeto realiza a criação do banco PostgreSQL automaticamente caso ele ainda não exista, desde que o usuário configurado tenha permissão para isso.

## 6. Execução

Com os serviços PostgreSQL e MongoDB ativos, execute:

```bash
npm start
```

O servidor será iniciado em:

http://localhost:3000

## 7. Rotas da API

| Método | Rota | Funcionalidade |
|---|---|---|
| GET | `/usuarios` | Listar usuários |
| POST | `/usuarios` | Cadastrar usuário |
| GET | `/usuarios/:id` | Buscar usuário |
| PUT | `/usuarios/:id` | Atualizar usuário |
| DELETE | `/usuarios/:id` | Excluir usuário |
| GET | `/livros` | Listar livros |
| POST | `/livros` | Cadastrar livro |
| GET | `/livros/:id` | Buscar livro |
| PUT | `/livros/:id` | Atualizar livro |
| DELETE | `/livros/:id` | Excluir livro |
| GET | `/emprestimos` | Listar empréstimos |
| POST | `/emprestimos` | Cadastrar empréstimo |
| GET | `/emprestimos/:id` | Buscar empréstimo |
| PUT | `/emprestimos/:id` | Atualizar empréstimo |
| DELETE | `/emprestimos/:id` | Excluir empréstimo |
| GET | `/avaliacoes` | Listar avaliações |
| POST | `/avaliacoes` | Cadastrar avaliação |
| GET | `/avaliacoes/:id` | Buscar avaliação |
| PUT | `/avaliacoes/:id` | Atualizar avaliação |
| DELETE | `/avaliacoes/:id` | Excluir avaliação |

## 8. Tratamento de erros

A aplicação possui validações nos dados recebidos pelas rotas e tratamento de exceções.

Os erros internos são registrados no arquivo:

`logs/errors.log`

## 9. Estrutura do projeto

- `config/`: configurações e conexões com os bancos de dados.
- `models/`: modelos Sequelize e Mongoose.
- `routes/`: rotas da API.
- `public/`: interface web do sistema.
- `utils/`: funções auxiliares, incluindo o logger.
- `logs/`: registros de erros.
- `app.js`: arquivo principal da aplicação.

## 10. Considerações finais

O projeto integra PostgreSQL e MongoDB em uma mesma aplicação, utilizando Node.js e Express para disponibilizar operações CRUD, validações, relacionamentos e tratamento de erros.