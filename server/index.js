const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const veiculosRouter = require("./routes/veiculosRoutes");
const usersRouter = require("./routes/UsersRoutes");
const tokenRouter = require("./routes/TokenRoutes");
const loginRequired = require("./middlewares/loginRequired");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Rodando servidor na porta: http://localhost:${PORT}`);
});

app.use("/veiculos", veiculosRouter);
app.use("/users", usersRouter);
app.use("/tokens", tokenRouter);
