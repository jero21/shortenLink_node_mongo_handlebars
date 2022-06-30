const express = require('express')
const { loginForm, registerForm, registerUser, confirmAccount, loginUser } = require('../controllers/authController')
const router = express.Router()

router.get("/login", loginForm)
router.get("/register", registerForm)
router.post("/register", registerUser)
router.get("/confirm/:token", confirmAccount)
router.post("/login", loginUser)

module.exports = router
