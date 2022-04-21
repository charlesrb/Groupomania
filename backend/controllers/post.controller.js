const db = require("../models");
const Sequelize = db.Sequelize;
const { Post } = db.sequelize.models;
const { User } = db.sequelize.models;

exports.readPost = (req, res) => {
  Post.findAll()
    .then((posts) => res.status(200).json({ data: posts }))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  User.findOne({
    attributes: ["username"],
    where: { id: req.body.idUSERS },
  }).then((user) => {
    const newPost = {
      idUSERS: req.body.userId,
      title: req.body.title,
      username: user.dataValues.username,
      content: req.body.content,
      attachment: `${req.protocol}://${req.get("host")}/images/${
        req.file.attachment
      }`,
      likes: req.body.likes,
    };
    Post.create(newPost)
      .then(() => {
        res.status(201).json({ message: "Post created !" });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.updatePost = (req, res) => {
  User.findOne({
    attributes: ["id", "email", "username", "isAdmin"],
    where: { id: req.body.idUSERS },
  })
    .then((user) => {
      if (user && (user.isAdmin == true || user.id == req.body.idUSERS)) {
        console.log("Modif ok pour le post :", req.body.id);
        models.Post.update(
          {
            content: req.body.content,
            attachment: req.body.attachment,
          },
          { where: { id: req.body.id } }
        )
          .then(() => res.end())
          .catch((err) => res.status(500).json(err));
      } else {
        res
          .status(401)
          .json({ error: "Utilisateur non autorisé à modifier ce post" });
      }
    })
    .catch((error) => res.status(500).json(error));
};

exports.deletePost = (req, res) => {
  Post.findOne({ id: req.params.id })
    .then((post) => {
      const filename = post.attachment.split("images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "Post supprimé" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
