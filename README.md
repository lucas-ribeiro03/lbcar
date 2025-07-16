# 🚗 Loja de Carros Online

Plataforma web moderna para exibição e gerenciamento de veículos à venda. Desenvolvida com foco em performance, escalabilidade e uma experiência de navegação intuitiva.

---

## 🔍 Funcionalidades

- ✅ Listagem de veículos com:
  - 📸 Imagem
  - 🏷️ Nome, cor, ano de lançamento
  - 🛞 Câmbio, condição, quilometragem
  - 💰 Preço
- 🔄 Carregamento dinâmico das imagens via URLs salvas no banco de dados
- 🎯 Interface responsiva e interativa
- 🎠 Carrossel com exibição dos veículos

---

## 🛠️ Tecnologias Utilizadas

| Camada       | Tecnologias             |
|--------------|--------------------------|
| Front-end    | React, Axios             |
| Back-end     | Node.js, Express         |
| Banco de Dados | MySQL, Sequelize (ORM) |
| Outros       | CORS, Dotenv             |

---

## ⚙️ Como Rodar o Projeto

### 📦 Backend

```bash
# Acesse a pasta do servidor
cd server

# Instale as dependências
npm install

# Crie um arquivo .env com:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3001

# Inicie o servidor
npm start
```

###💻 Frontend
```bash
# Acesse a pasta do cliente
cd client

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

## 📌 Observações

- 🧩 **Foco principal:** exibição eficiente de veículos com carregamento dinâmico de dados e imagens via banco de dados.
- 🧱 **Estrutura pronta para expansão com:**
  - 🔐 Login e autenticação
  - 🎯 Filtros por preço, ano ou marca
  - 🛠️ Painel administrativo para cadastro e edição
- 🖥️ **Responsivo:** adaptado para desktop e mobile.

---

## 👨‍💻 Autor

**Lucas Ribeiro** — Desenvolvedor Front-End

[🔗 GitHub](https://github.com/lucas-ribeiro03)  
[🔗 LinkedIn](https://www.linkedin.com/in/seu-usuario)
