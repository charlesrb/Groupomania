require("dotenv").config({ path: "./config/.env" });

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
// try {
//   sequelize.authenticate();
//   console.log("Connecté à la base de données MySQL!");
// } catch (error) {
//   console.error("Impossible de se connecter, erreur suivante :", error);
// }
