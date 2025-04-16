<h1 align="center" style="font-weight: bold;">COMAG Backend 💻</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#structure">Project Structure</a> •
 <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>Backend do projeto COMAG, responsável pela gestão de produtos e serviços da empresa.</b>
</p>

<h2 id="tech">💻 Technologies</h2>

- Node.js
- Express
- MySQL
- dotenv
- cors
- mysql2

<h2 id="started">🚀 Getting Started</h2>

<h3>Prerequisites</h3>

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)

<h3>Cloning</h3>

```bash
git clone https://github.com/seu-usuario/comag_backend.git
```

<h3>Config .env variables</h3>

Use o arquivo `.env.example` como referência para criar o `.env` com as credenciais do MySQL:

```yaml
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=senha
DB_NAME=comag_db
```

<h3>Installing dependencies</h3>

```bash
cd comag_backend
npm install
```

<h3>Starting the project</h3>

```bash
npm run dev
```

<h2 id="structure">📁 Project Structure</h2>

```bash
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
```

<h2 id="routes">📍 API Endpoints</h2>

| Route              | Description                                          |
|--------------------|------------------------------------------------------|
| <kbd>GET /api/products</kbd>       | Retorna todos os produtos              |
| <kbd>GET /api/products/:id</kbd>   | Retorna um produto pelo ID             |
| <kbd>POST /api/products</kbd>      | Adiciona um novo produto               |
| <kbd>PUT /api/products/:id</kbd>   | Atualiza um produto pelo ID            |
| <kbd>DELETE /api/products/:id</kbd>| Remove um produto pelo ID              |
| <kbd>GET /api/services</kbd>       | Retorna todos os serviços              |
| <kbd>GET /api/services/:id</kbd>   | Retorna um serviço pelo ID             |
| <kbd>POST /api/services</kbd>      | Adiciona um novo serviço               |
| <kbd>PUT /api/services/:id</kbd>   | Atualiza um serviço pelo ID            |
| <kbd>DELETE /api/services/:id</kbd>| Remove um serviço pelo ID              |
| <kbd>GET /api/orders</kbd>         | Retorna todos os pedidos               |
| <kbd>GET /api/orders/:id</kbd>     | Retorna um pedido pelo ID              |
| <kbd>POST /api/orders</kbd>        | Cria um novo pedido                    |
| <kbd>GET /api/order-items</kbd>    | Retorna todos os itens de pedidos      |
| <kbd>GET /api/order-items/:orderId</kbd> | Retorna itens de um pedido específico |
| <kbd>POST /api/order-items</kbd>   | Adiciona um item a um pedido           |
| <kbd>GET /api/users</kbd>          | Retorna todos os usuários              |
| <kbd>GET /api/users/:id</kbd>      | Retorna um usuário pelo ID             |
| <kbd>POST /api/users</kbd>         | Cria um novo usuário                   |


### <h3 id="get-products">GET /api/products</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "name": "Compressor XYZ",
    "price": 5000
  }
]
```

---

### <h3 id="get-product-by-id">GET /api/products/:id</h3>

**RESPONSE**
```json
{
  "id": 1,
  "name": "Compressor XYZ",
  "price": 5000
}
```

---

### <h3 id="post-products">POST /api/products</h3>

**REQUEST**
```json
{
  "name": "Novo Compressor",
  "price": 4500
}
```

**RESPONSE**
```json
{
  "message": "Produto criado com sucesso"
}
```

---

### <h3 id="put-product">PUT /api/products/:id</h3>

**REQUEST**
```json
{
  "name": "Compressor Atualizado",
  "price": 4800
}
```

**RESPONSE**
```json
{
  "message": "Produto atualizado com sucesso"
}
```

---

### <h3 id="delete-product">DELETE /api/products/:id</h3>

**RESPONSE**
```json
{
  "message": "Produto removido com sucesso"
}
```

---

### <h3 id="get-services">GET /api/services</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "name": "Instalação",
    "price": 200
  }
]
```

---

### <h3 id="get-service-by-id">GET /api/services/:id</h3>

**RESPONSE**
```json
{
  "id": 1,
  "name": "Instalação",
  "price": 200
}
```

---

### <h3 id="post-service">POST /api/services</h3>

**REQUEST**
```json
{
  "name": "Manutenção",
  "price": 150
}
```

**RESPONSE**
```json
{
  "message": "Serviço criado com sucesso"
}
```

---

### <h3 id="put-service">PUT /api/services/:id</h3>

**REQUEST**
```json
{
  "name": "Manutenção Premium",
  "price": 250
}
```

**RESPONSE**
```json
{
  "message": "Serviço atualizado com sucesso"
}
```

---

### <h3 id="delete-service">DELETE /api/services/:id</h3>

**RESPONSE**
```json
{
  "message": "Serviço removido com sucesso"
}
```

---

### <h3 id="get-orders">GET /api/orders</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "userId": 3,
    "total": 5200
  }
]
```

---

### <h3 id="get-order-by-id">GET /api/orders/:id</h3>

**RESPONSE**
```json
{
  "id": 1,
  "userId": 3,
  "total": 5200
}
```

---

### <h3 id="post-order">POST /api/orders</h3>

**REQUEST**
```json
{
  "userId": 3
}
```

**RESPONSE**
```json
{
  "message": "Pedido criado com sucesso",
  "orderId": 1
}
```

---

### <h3 id="get-order-items">GET /api/order-items</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "orderId": 1,
    "productId": 2,
    "quantity": 1
  }
]
```

---

### <h3 id="get-order-items-by-order">GET /api/order-items/:orderId</h3>

**RESPONSE**
```json
[
  {
    "id": 1,
    "orderId": 1,
    "productId": 2,
    "quantity": 1
  }
]
```

---

### <h3 id="post-order-item">POST /api/order-items</h3>

**REQUEST**
```json
{
  "orderId": 1,
  "productId": 2,
  "quantity": 1
}
```

**RESPONSE**
```json
{
  "message": "Item adicionado ao pedido com sucesso"
}
```

---

### <h3 id="get-users">GET /api/users</h3>

**RESPONSE**
```json
[
  {
    "id": 3,
    "name": "João Silva",
    "email": "joao@example.com"
  }
]
```

---

### <h3 id="get-user-by-id">GET /api/users/:id</h3>

**RESPONSE**
```json
{
  "id": 3,
  "name": "João Silva",
  "email": "joao@example.com"
}
```

---

### <h3 id="post-user">POST /api/users</h3>

**REQUEST**
```json
{
  "name": "Maria Oliveira",
  "email": "maria@example.com",
  "password": "senha123"
}
```

**RESPONSE**
```json
{
  "message": "Usuário criado com sucesso"
}
```


<h2 id="colab">🤝 Collaborators</h2>

Special thanks to all contributors to this project.

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/86326118?v=4" width="100px;" alt="Profile Picture"/><br>
        <sub>
          <b>Joey Alan</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h2 id="contribute">📫 Contribute</h2>

Para contribuir com este projeto, siga os passos:

1. `git clone https://github.com/seu-usuario/comag_backend.git`
2. `git checkout -b feature/NOVA_FEATURE`
3. Siga o padrão de commits
4. Abra um Pull Request explicando a alteração e aguarde a revisão!

<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
