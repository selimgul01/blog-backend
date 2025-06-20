const express = require("express")
const router = express.Router()
const { register, login, getAllUser } = require("../controllers/userController")

router.get("/",getAllUser)
router.post("/register",register)
router.post("/login",login)


module.exports = router;  