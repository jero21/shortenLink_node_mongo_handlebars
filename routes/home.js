const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    const urls = [
        {origin: "www.google.com/bluuweb1", shortURL: "afs6df7"},
        {origin: "www.google.com/bluuweb2", shortURL: "afsdff7"}
    ]

    res.render("home", {urls})
})

module.exports = router