const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const sequelize = require("./config/database");
const cors = require("cors");



const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes);

const PORT = 5000;

sequelize
  .authenticate()
  //sequelize.sync({ force: true }) //apaga o comentaário para recriar o banco de dados e depois comenta de novo para não pagar as alteração
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida.");
    return sequelize.sync({});
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((error) =>
    console.error("Erro ao conectar ao banco de dados:", error)
  );
