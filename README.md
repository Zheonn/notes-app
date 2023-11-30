#  Projeto - NotesApp

## Introdução

Bem-vindo à documentação do projeto "NotesApp". Este projeto é uma aplicação de gerenciamento de anotações, desenvolvido usando o framework Vue.js para o frontend, Node.js (com Express) para o backend, e MongoDB para persistência de dados.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: o frontend (interface do usuário) e o backend (servidor e banco de dados).

### Frontend (Vue.js)

O frontend é construído com o framework Vue.js, uma biblioteca JavaScript progressiva para a construção de interfaces de usuário. A estrutura do projeto Vue segue o padrão MVC (Model-View-Controller).

#### Componentes Principais:

1. **Header (`Header.vue`):**
   - Exibe o cabeçalho da aplicação.
   - Contém botões para carregar e persistir dados.

2. **Resumo das anotações (`NoteResume.vue`):**
   - Representa uma anotação na lista de anotações.
   - Exibe a descrição e o lembrete da anotação.
   - Fornece botões para editar e excluir a anotação.

3. **Menu de anotações (`NotesMenu.vue`):**
   - Exibe a lista de anotações usando o componente `NoteResume`.

4. **Criação/Edição de Anotações (`NoteCreation.vue`):**
   - Permite ao usuário criar uma nova anotação ou editar uma anotação existente.
   - Campos para descrição, potencial do negócio, categoria e lembrete.
   - Botões para salvar e cancelar.

5. **Botão Personalizado (`CustomButton.vue`):**
   - Componente para criar botões personalizados reutilizáveis.
   - Aceita propriedades para texto e tipo (azul ou vermelho).

#### Estrutura de Roteamento:

- **Página Inicial (`HomePage.vue`):**
  - Exibe a lista de notas usando o componente `NotesMenu`.

- **Criação/Edição de Nota (`NoteCreation.vue`):**
  - Permite ao usuário criar ou editar uma nota.
  - Rota acessível através de `/new-note` para criação e `/edit-note/:id` para edição.

#### Estilização:

- Estilos são definidos em arquivos `.vue` usando CSS com escopo.

### Backend (Node.js com Express e MongoDB)

O backend é construído com Node.js, usando o framework Express para criar o servidor e interagir com o MongoDB para persistência de dados.

#### Arquivos Principais:

1. **`server.js`:**
   - Configura o servidor Express.
   - Define rotas para persistir e recuperar dados no MongoDB.

2. **`db.js`:**
   - Implementa funções para interagir com o banco de dados IndexedDB no frontend.

#### Modelo de Dados:

- **Modelo `notes` (MongoDB):**
  - Contém os campos `token` (String) e `notes` (Array) para armazenar notas.

#### Rotas:

- **`POST /api/persistir-dados`:**
  - Persiste as notas no banco de dados MongoDB.

- **`GET /api/recuperar-dados/:token`:**
  - Recupera as notas associadas a um token específico.

### GUI (Interface Gráfica do Usuário)

A interface gráfica do usuário foi projetada para ser amigável e responsiva. A aplicação é centrada na lista de notas, permitindo ao usuário criar, editar, excluir, e visualizar detalhes de cada nota.

#### Funcionalidades Principais:

1. **Criação de Notas:**
   - Permite ao usuário criar novas notas com descrição, potencial do negócio, categoria e lembrete.

2. **Edição de Notas:**
   - Fornece a capacidade de editar notas existentes.

3. **Exclusão de Notas:**
   - Permite ao usuário excluir notas indesejadas.

4. **Persistência de Dados:**
   - Oferece a capacidade de salvar notas no banco de dados para acesso posterior.

5. **Recuperação de Dados:**
   - Permite ao usuário carregar notas previamente salvas.

## Tutorial de Execução

### Requisitos:

- Node.js
- Vue CLI (Instalação: `npm install -g @vue/cli`)

### Backend (Node.js com Express e MongoDB)

1. Clone o repositório.

```bash
git clone <URL_DO_REPOSITORIO>
cd backend
```

2. Instale as dependências.

```bash
npm install
```
3. Altere a URL de conexão com o banco de dados de acordo com as suas credenciais.

4. Execute o servidor.

```bash
node server.js
```

O backend estará rodando em `http://localhost:3000`.

### Frontend (Vue.js)

1. Abra um novo terminal e navegue até a pasta `frontend`.

```bash
cd frontend
```

2. Instale as dependências.

```bash
npm install
```

3. Execute o aplicativo Vue.

```bash
npm run serve
```

O frontend estará disponível em `http://localhost:8080`.

Acesse a aplicação em seu navegador para começar a gerenciar suas anotações.

## Conclusão

Este projeto "NotesApp" oferece uma solução simples e eficaz para o gerenciamento de anotações. A documentação fornece uma visão geral da estrutura do projeto, funcionalidades principais e tutoriais para execução.
