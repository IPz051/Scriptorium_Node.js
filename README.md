## Biblioteca (Scriptorium)

Aplicacao Node.js com Express para gerenciar um acervo de biblioteca com autenticacao JWT. O projeto possui interface web estatica para cadastro/login, listagem de livros e registro de emprestimos.

### Tecnologias
- Node.js
- Express
- jsonwebtoken
- bcrypt
- uuid
- HTML, CSS e JavaScript

### Requisitos
- Node.js 18 ou superior
- npm

### Instalacao
```bash
npm install
```

### Variaveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com base em `.env.example`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRETKEY=sua-chave-secreta
```

Variaveis utilizadas:
- `PORT`: porta HTTP da aplicacao
- `JWT_SECRETKEY`: chave usada para assinar e validar os tokens JWT
- `NODE_ENV`: ambiente de execucao

### Execucao Local
Modo desenvolvimento:

```bash
npm run dev
```

Modo producao:

```bash
npm start
```

A aplicacao sobe em `http://localhost:3000` por padrao.

### Paginas da Interface
- `/`: catalogo principal, cadastro de livros e registro de emprestimos
- `/auth.html`: pagina de registro, login e logout

### Fluxo de Uso
1. Acesse `/auth.html`
2. Registre um usuario
3. Faca login
4. Volte para `/`
5. Cadastre livros e registre emprestimos

### Autenticacao
- `POST /auth/register` cria usuario com `{ name, email, password }`
- `POST /auth/login` autentica com `{ email, password }` e retorna um JWT
- Endpoints protegidos exigem `Authorization: Bearer <token>`

O token e salvo no navegador e a interface exibe o usuario logado no topo da pagina principal.

### Endpoints

#### Livros
- `GET /api/books` lista livros
- `GET /api/books/:id` retorna um livro
- `POST /api/books` cria livro com `{ title, author, quantityAvalible }`
- `PUT /api/books/:id` atualiza campos do livro
- `DELETE /api/books/:id` remove livro

#### Emprestimos
- `GET /api/loans` lista emprestimos
- `GET /api/loans/:id` retorna um emprestimo
- `POST /api/loans` cria emprestimo com `{ bookId }`
- `POST /api/loans/:id/return` registra devolucao

### Regras de Negocio
- O emprestimo exige autenticacao
- O livro precisa ter `quantityAvalible > 0`
- O prazo de devolucao e de 14 dias
- Na devolucao, o sistema atualiza `isReturned`, `returnDate` e `isLate`

### Deploy na Vercel
O projeto foi ajustado para funcionar na Vercel com Express em ambiente serverless.

Arquivos adicionados para isso:
- `src/app.js`: cria e exporta a aplicacao Express sem abrir porta
- `src/server.js`: usado apenas para execucao local com `app.listen(...)`
- `api/index.js`: entrada serverless da Vercel
- `vercel.json`: roteia todas as requisicoes para a aplicacao Express
- `.env.example`: modelo de variaveis de ambiente

Configuracao recomendada na Vercel:
- Framework Preset: `Other`
- Build Command: deixar vazio
- Output Directory: deixar vazio
- Install Command: `npm install`

Variaveis de ambiente na Vercel:
- `JWT_SECRETKEY`
- `NODE_ENV=production`

Observacao:
- `PORT` nao precisa ser configurada manualmente na Vercel
- localmente continue usando `npm run dev` ou `npm start`

Checklist antes do deploy:
- configurar `JWT_SECRETKEY` no painel da Vercel
- confirmar que `npm start` sobe a aplicacao localmente
- validar acesso a `/` e `/auth.html`
- subir o repositorio com `vercel.json`, `api/index.js` e `src/app.js`

### Limitacoes Importantes
- Os dados ficam em memoria; ao reiniciar a aplicacao, livros, usuarios e emprestimos sao perdidos
- O projeto e adequado para estudo e demonstracao, nao para producao real sem banco de dados
- Em ambiente serverless, a persistencia em memoria e ainda mais limitada
- O arquivo `.env` esta no `.gitignore`, entao as variaveis devem ser configuradas manualmente no deploy

### Verificacao Rapida
Itens conferidos neste projeto:
- `npm start` inicia a aplicacao corretamente
- a rota `/` responde com status `200`
- o script de producao existe no `package.json`
- a aplicacao usa `process.env.PORT`
- a estrutura esta separada entre `app` e `server`, compativel com a Vercel

### Observacao
Se quiser preparar o projeto para producao de verdade, o proximo passo recomendado e adicionar banco de dados e persistencia para usuarios, livros e emprestimos.
