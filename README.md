🚗 Loja de Carros Online
Plataforma web moderna para exibição e gerenciamento de veículos à venda. Desenvolvida com foco em performance, escalabilidade e uma experiência de navegação intuitiva.

🔍 Funcionalidades
Listagem de carros com:

Imagem

Nome, cor, ano de lançamento

Quilometragem, preço, câmbio e condição

Carregamento dinâmico das imagens via URLs salvas no banco de dados

Interface responsiva e interativa

Carrossel de exibição dos veículos

🛠️ Tecnologias Utilizadas
Front-end: React, Axios

Back-end: Node.js, Express

Banco de Dados: MySQL

Outros: Sequelize (ORM), Cors, Dotenv

⚙️ Como rodar o projeto
📦 Backend
Clone o repositório e entre na pasta do servidor:

bash
Copiar
Editar
cd server
npm install
Configure o arquivo .env com suas variáveis de ambiente (ex: conexão MySQL):

ini
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3001
Inicie o servidor:

bash
Copiar
Editar
npm start
💻 Frontend
Acesse a pasta do cliente:

bash
Copiar
Editar
cd client
npm install
Inicie o app:

bash
Copiar
Editar
npm start
