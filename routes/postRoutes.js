const express = require("express")
const { createPost, getAllPost, getPostById, updatePost, deletePost, getMyPosts } = require("../controllers/postController")
const router = express.Router()
const auth = require("../middleware/auth") 
const upload = require("../middleware/uploads");

router.post("/", auth , upload.single("image"), createPost)
// router.post("/", upload.single("image"), createPost)
router.get("/my-posts", auth, getMyPosts);
router.get("/",getAllPost)
router.get("/:id",getPostById)
router.put("/:id", upload.none(), updatePost);
router.delete("/:id",deletePost)



module.exports = router    