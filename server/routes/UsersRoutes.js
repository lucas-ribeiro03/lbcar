const express = require("express");
const db = require("../db/db");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/cadastro", (req, res) => {
  console.log("entrei no /cadastro");
  const { email, password, name } = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(password, 5);
  console.log("password", hash);

  const SQL = `INSERT INTO user (user_name, user_email, user_password) VALUES ('${name}', '${email}', '${hash}')`;

  db.query(SQL, (err, result) =>
    err ? console.log("erro no /cadastro") : res.send(result)
  );
});

router.get("/getUsers", async (req, res) => {
  const { user_email } = req.query;
  const SQL = `SELECT * FROM user WHERE user_email = '${user_email}'`;

  db.query(SQL, (err, result) =>
    err ? console.log("ERRO NO /getUsers") : res.send(result)
  );
});

router.put("/editUser", (req, res) => {
  const { user_email, user_name, id_user, user_image } = req.body;
  console.log(`user_image: ${user_image}`);
  const SQL = `UPDATE user SET user_email = '${user_email}', user_name = '${user_name}', user_image = '${user_image}' WHERE id_user = ${id_user}`;
  console.log(req.body);
  console.log(id_user);

  db.query(SQL, (err, result) =>
    err ? console.log("erro no editUser" + err) : res.send(result)
  );
});

router.put("/uploads", upload.single("image"), (req, res) => {
  try {
    console.log(req.file);
    res.json({ filename: req.file.filename });
    console.log("estou no try");
  } catch (e) {
    console.log("erro no /uploads");
  }
});
module.exports = router;
