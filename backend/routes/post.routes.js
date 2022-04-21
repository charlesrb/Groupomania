const router = require("express").Router();
const postController = require("../controllers/post.controller");
const auth = require("../middleware/auth");

router.post("/", auth, postController.createPost);
router.get("/", auth, postController.readPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;
