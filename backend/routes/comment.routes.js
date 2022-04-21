const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const auth = require("../middleware/auth");

router.get("/", auth, commentController.findAllComments);

router.get("/:id", auth, commentController.findOneComment);

router.post("/", commentController.createComment);

router.delete("/", auth, commentController.deleteComment);

module.exports = router;
