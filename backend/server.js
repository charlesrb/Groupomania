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
