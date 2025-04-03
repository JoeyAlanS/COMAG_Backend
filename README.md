COMAG_Backend

Este repositório contém o backend do projeto COMAG, desenvolvido com Node.js, Express e MySQL.

🚀 Tecnologias Utilizadas

Node.js

Express

MySQL

Dotenv

Cors

Nodemon (para desenvolvimento)

📂 Estrutura do Projeto

COMAG_Backend/
│-- node_modules/
│-- src/
│   ├── config/
│   │   ├── db.js            # Configuração do MySQL
│   ├── routes/
│   │   ├── products.js      # Rotas para produtos
│   │   ├── services.js      # Rotas para serviços
│   ├── controllers/
│   │   ├── productController.js  # Lógica de Produtos
│   │   ├── serviceController.js  # Lógica de Serviços
│   ├── models/
│   │   ├── productModel.js   # Modelo de Produto
│   │   ├── serviceModel.js   # Modelo de Serviço
│   ├── index.js              # Arquivo principal
│-- .env                      # Variáveis de ambiente
│-- package.json               # Dependências do projeto
│-- README.md                  # Documentação

📌 Como Instalar e Executar

1️⃣ Clonar o Repositório

git clone https://github.com/seu-usuario/COMAG_Backend.git
cd COMAG_Backend

2️⃣ Instalar as Dependências

npm install

3️⃣ Configurar o Banco de Dados MySQL

Crie um banco de dados no MySQL chamado comag_db e adicione as credenciais ao arquivo .env:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=suasenha
DB_NAME=comag_db

4️⃣ Rodar o Servidor

Para iniciar o servidor em modo de desenvolvimento:

npm run dev

Ou em produção:

npm start

O backend rodará em http://localhost:3000.

🔗 Como Conectar o Backend ao Frontend

No frontend (Vite), as requisições podem ser feitas via fetch:

fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Erro ao buscar produtos:", error));

Se o frontend e o backend estiverem rodando em domínios diferentes, certifique-se de que o CORS está ativado no backend (src/index.js):

const cors = require("cors");
app.use(cors());

🛠 Testando com Postman ou Insomnia

Inicie o backend (npm run dev).

No Postman ou Insomnia, crie uma nova requisição GET para:

http://localhost:3000/api/products

Verifique a resposta JSON com os produtos.

📝 Rotas Disponíveis

📦 Produtos

GET /api/products - Retorna todos os produtos.

GET /api/products/:id - Retorna um produto pelo ID.

POST /api/products - Adiciona um novo produto.

PUT /api/products/:id - Atualiza um produto.

DELETE /api/products/:id - Remove um produto.

🛠 Serviços

GET /api/services - Retorna todos os serviços.

GET /api/services/:id - Retorna um serviço pelo ID.

POST /api/services - Adiciona um novo serviço.

PUT /api/services/:id - Atualiza um serviço.

DELETE /api/services/:id - Remove um serviço.

🤝 Contribuição

Faça um fork do repositório.

Crie uma nova branch (git checkout -b feature-nova).

Faça suas alterações e commit (git commit -m 'Adiciona nova funcionalidade').

Envie para o GitHub (git push origin feature-nova).

Abra um Pull Request.

📌 Autor

Desenvolvido por ** Joey **

📜 Licença

Este projeto está sob a licença MIT.

