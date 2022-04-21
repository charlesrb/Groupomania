const router = require("express").Router();
const userController = require("../controllers/user.controller");

// auth
router.post("/register", userController.signup);
router.post("/login", userController.login);

// user DB
router.get("/", userController.findAllUsers);
router.get("/:id", userController.findOneUser);
router.put("/modify/:id", userController.modifyUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
