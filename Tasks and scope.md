FEATURES:

Login/Registro
Criar board
Criar colunas dentro do board
Criar cards dentro das colunas
Editar card
Mover card entre colunas
Deletar card

(Usar Argon2id(npm install argon2))

V2:
Acessos
REDIS

SQL:

User: id, email, passwordHash, created_at
Board: id, userId, name, created_at
Column: id, boardId, title, order, created_at
Card: id, columnId, title, description, order, created_at, updated_at

User 1:N Boards
Board 1:N Columns
Column 1:N Cards

API:

auth/
POST /register
POST /login

boards/
GET /boards
POST /boards
GET /boards/:id
DELETE /boards/:id

columns/
POST /columns
PATCH /columns/:id
DELETE /columns/:id

cards/
POST /cards
PATCH /cards/:id
DELETE /cards/:id

Fluxo:

Registrar / Logar

Criar board

Criar colunas

Criar cards

Mover/editar/excluir cards
