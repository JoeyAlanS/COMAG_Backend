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
| <kbd>GET /api/products</kbd>  | Retorna todos os produtos |
| <kbd>GET /api/products/:id</kbd>  | Retorna um produto pelo ID |
| <kbd>POST /api/products</kbd>  | Adiciona um novo produto |
| <kbd>PUT /api/products/:id</kbd>  | Atualiza um produto pelo ID |
| <kbd>DELETE /api/products/:id</kbd>  | Remove um produto pelo ID |

<h3 id="get-products">GET /api/products</h3>

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

<h3 id="post-products">POST /api/products</h3>

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
