## Exercicio Final – Biblioteca (Scriptorium)

Aplicação Node.js com Express para gerenciar um acervo de biblioteca (livros e empréstimos), com autenticação JWT. Inclui uma página estática com visual rústico medieval para interação básica com o acervo.

### Tecnologias
- Node.js + Express
- JWT (jsonwebtoken), bcrypt, uuid
- HTML/CSS/JS (UI estática)

### Instalação
```bash
npm install
```

### Execução
```bash
npm start
```
Servidor: http://localhost:3000  
UI (catálogo): http://localhost:3000/

### Autenticação
- Registre usuário: POST `/auth/register` `{ name, email, password }`
- Faça login: POST `/auth/login` `{ email, password }` → retorna token JWT
- Endpoints protegidos exigem header `Authorization: Bearer <token>`

### Livros (Books)
- GET `/api/books` – lista livros
- GET `/api/books/:id` – detalhe do livro
- POST `/api/books` – cria livro `{ title, author, quantityAvalible:number }`
- PUT `/api/books/:id` – atualiza campos informados
- DELETE `/api/books/:id` – remove livro

### Empréstimos (Loans)
- GET `/api/loans` – lista empréstimos
- GET `/api/loans/:id` – detalhe do empréstimo
- POST `/api/loans` – cria empréstimo (protegido) `{ bookId }`
- POST `/api/loans/:id/return` – devolução do empréstimo

Regras:
- Criação de empréstimo verifica disponibilidade (quantityAvalible > 0) e define prazo de 14 dias.
- Devolução atualiza `isReturned`, define `returnDate` e calcula atraso (`isLate`).

### Observações
- Dados são mantidos em memória (arrays), adequados para estudo. Em produção, use banco de dados.
- A UI cobre cadastro e listagem de livros; empréstimos requerem autenticação via ferramentas REST (Insomnia/Postman).
