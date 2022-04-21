const db = require("../models");
const Sequelize = db.Sequelize;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = db.sequelize.models;

const newToken = (user) => {
  token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
    expiresIn: "24h",
  });
  return { user, token };
};

exports.login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (passwordValid) {
      token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        "RANDOM_TOKEN_SECRET",
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({ token: token });
    } else {
      res.status(400).json({ error: "Password incorrect" });
    }
  } else {
    res.status(404).json({ error: "l'utilisateur n'existe pas" });
  }
};

exports.signup = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);

  User.create({
    email: req.body.email,
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt),
    bio: req.body.bio,
    picture: req.body.picture,
    isAdmin: req.body.isAdmin,
  })
    .then((user) => res.status(201).json(newToken(user)))
    .catch((error) => res.status(401).json({ error: error }));
};

exports.findAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      console.log(users);
      res.status(200).json({ data: users });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    User.destroy({ where: { id: id } });
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.modifyUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  User.findByPk(id)
    .then((user) => {
      if (!user)
        return res.status(404).json({ message: "Utilisateur non trouvé" });

      user.username = body.username;
      user.email = body.email;
      user.bio = body.bio;
      user.picture = body.picture;
      user.password = body.password;

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur sauvegardé" }))
        .catch((error) => res.status(500).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id: id } })
    .then((deleted) => {
      if (deleted === 0)
        return res
          .status(404)
          .json({ message: "Cet utilisateur n'existe pas" });
      res.status(200).json({ message: "Utilisateur bien supprimé !" });
    })
    .catch((error) => res.status(500).json({ error: error }));
};
