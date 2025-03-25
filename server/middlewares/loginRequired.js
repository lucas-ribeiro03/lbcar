const jwt = require("jsonwebtoken");

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  console.log("no authorization");

  if (!authorization) {
    return res.status(401).json({
      erros: ["Login required"],
    });
  }
  const [texto, token] = authorization.split(" ");
  console.log("token gerado");

  if (!token) {
    return res.status(401).json({
      erros: ["Token não encontrado"],
    });
  }

  console.log("encontrou o token");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    req.id_user = dados.id;
    req.user_email = dados.email;

    console.log("Usuário autenticado:", dados.id, dados.email);

    return next();
  } catch (e) {
    console.log("TOKEN INVALIDO 2");
  }
};

module.exports = loginRequired;
