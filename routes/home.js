const express = require('express')
const { readUrl, addUrl, deleteUrl, editUrlForm, editUrl, redirectUrl } = require('../controllers/homeController')
const validateUrl = require('../middlewares/urlValida')
const router = express.Router()

router.get("/", readUrl)
router.post("/", validateUrl, addUrl)
router.get("/delete/:id", deleteUrl)
router.get("/edit/:id", editUrlForm)
router.post("/edit/:id", validateUrl, editUrl)
router.get("/:shortUrl", redirectUrl)

module.exports = router