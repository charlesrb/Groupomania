const db = require("../models");
const Sequelize = db.Sequelize;
const { Post } = db.sequelize.models;
const { User } = db.sequelize.models;
const { Comment } = db.sequelize.models;

exports.createComment = async (req, res, next) => {
  const comment = new Comment({
    idUSERS: req.body.idUSERS,
    idPOSTS: req.body.idPOSTS,
    content: req.body.content,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findAllComments = async (req, res, next) => {
  Comment.findAll()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneComment = async (req, res, next) => {
  Comment.findAll({
    where: {
      idPOSTS: req.params.idPOSTS,
    },
    include: {
      model: User,
      required: true,
      attributes: ["username"],
    },
  })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteComment = async (req, res, next) => {
  Comment.destroy({ where: { id: req.query.id } })
    .then(() => res.status(200).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
