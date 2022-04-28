const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });
const db = require("./config/db");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;

// server connexion
db.sync({ force: true })
  .then(console.log("Connexion à la base de donnée !"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
