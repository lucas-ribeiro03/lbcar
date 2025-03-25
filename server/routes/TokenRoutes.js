const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { id, inputEmail } = req.body;
  const { name, email } = req.body;

  if (id) {
    const token = jwt.sign({ id, inputEmail }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    console.log("Token gerado com sucesso para o email: " + inputEmail);
    return res.json({ token, id, inputEmail });
  }

  if (name) {
    const token = jwt.sign({ name, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    console.log("Token gerado com sucesso para o email: " + email);
    return res.json({ token, id, inputEmail });
  }

  console.log(req.body);
});

module.exports = router;
