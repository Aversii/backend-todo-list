# 📝 To-Do List API

Bem-vindo à **To-Do List API**! Esta API backend foi desenvolvida com o framework [NestJS](https://nestjs.com/) e fornece endpoints para gerenciar usuários e tarefas. 🚀

---

## 🚀 Deploy:
 - https://backend-todo-list-eight.vercel.app

## 📋 Funcionalidades

- 👤 **Gerenciamento de Usuários**
  - Criar usuários
  - Login
  - Visualizar detalhes de um usuário
  - Atualizar informações do usuário
  - Excluir usuários

- ✅ **Gerenciamento de Tarefas**
  - Criar tarefas
  - Listar todas as tarefas
  - Visualizar uma tarefa específica
  - Atualizar uma tarefa
  - Excluir tarefas

---

### 🛠️ Pré-requisitos

Certifique-se de ter os seguintes itens instalados na sua máquina:
- Node.js (v16 ou superior)
- NPM ou Yarn
- Banco de Dados (OracleDB)

### 🔧 Configuração

1. Clone este repositório:

git clone https://github.com/Aversii/backend-todo-list.git cd backend-todo-list


2. Instale as dependências:

npm install


3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto.
- Adicione as configurações necessárias para o OracleDB e JWT.

4. Execute o servidor em modo de desenvolvimento:

npm run start


5. Acesse a API em `http://localhost:3000`.

---

## 📚 Endpoints

### **Usuários**

| Método | Rota              | Descrição                        |
|--------|-------------------|----------------------------------|
| POST   | `/users`          | Criar um novo usuário           |
| POST   | `/users/login`    | Realizar login                  |
| GET    | `/users`          | Listar todos os usuários        |
| GET    | `/users/:id`      | Obter detalhes de um usuário    |
| PUT    | `/users/:id`      | Atualizar informações do usuário|
| DELETE | `/users/:id`      | Excluir um usuário              |

### **Tarefas**

| Método | Rota              | Descrição                        |
|--------|-------------------|----------------------------------|
| POST   | `/tasks`          | Criar uma nova tarefa           |
| GET    | `/tasks`          | Listar todas as tarefas         |
| GET    | `/tasks/:id`      | Obter detalhes de uma tarefa    |
| PUT    | `/tasks/:id`      | Atualizar uma tarefa            |
| DELETE | `/tasks/:id`      | Excluir uma tarefa              |

---

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs robustas.
- **TypeORM**: ORM para gerenciar a comunicação com o banco de dados.
- **OracleDB**: Banco de dados utilizado para armazenamento.
- **JWT**: Autenticação baseada em tokens.
- **bcrypt**: Para criptografia de senhas.

---

## ✅ Checklist de Implementação

- [x] Configuração do NestJS
- [x] Criação de rotas para usuários
- [x] Criação de rotas para tarefas
- [x] Integração com o OracleDB
- [x] Autenticação com JWT

---


## 🌟 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie um branch com sua feature:

git checkout -b minha-feature

3. Commit suas alterações:

git commit -m 'Adicionando minha feature'

4. Faça um push para o branch:

git push origin minha-feature

5. Abra um Pull Request.

---

## 📬 Contato

Se você tiver alguma dúvida ou sugestão, entre em contato: **lucasaversi@gmail.com**.

---

Feito com ❤️ por [Lucas Aversi](https://github.com/Aversii)
