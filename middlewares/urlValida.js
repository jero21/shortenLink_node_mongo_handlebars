const { url } = require("url")

const validateUrl = (req, res, next) => {
    try {
        const { origin } = req.body
        const urlFrontend = new URL(origin)
        if(urlFrontend.origin !== "null") {
            return next()
        } else {
            throw new Error("invalid url")
        }

    } catch (error) {
        console.log(error)
        res.send("invalid url")
    }
}


module.exports = validateUrl