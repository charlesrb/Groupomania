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
      attachment: req.body.attachment,
      likes: req.body.likes,
    };
    Post.create(newPost)
      .then(() => {
        res.status(201).json({ message: "Post created !" });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.updatePost = (req, res) => {};

exports.deletePost = (req, res) => {};
