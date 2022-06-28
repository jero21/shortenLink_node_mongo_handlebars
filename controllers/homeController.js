const Url = require('../models/Url')
const { nanoid } = require("nanoid")

const readUrl = async (req, res) => {
    try {
        const urls = await Url.find().lean()
        res.render("home", {urls})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}
const addUrl = async (req, res) => {

    const {origin} = req.body
    try {
        const url = new Url({origin: origin, shortURL: nanoid(8)})
        await url.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.send('error ' + error)
    }
}

const deleteUrl = async (req, res) => {

    const {id} = req.params
    try {
        await Url.findByIdAndDelete(id)
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.send('error ' + error)
    }
}

const editUrlForm = async (req, res) => {

    const {id} = req.params
    try {
        const url = await Url.findById(id).lean()
        res.render("home", {url})
    } catch (error) {
        console.log(error)
        res.send('error ' + error)
    }
}

const editUrl = async (req, res) => {

    const { id } = req.params
    const { origin } = req.body
    try {
        await Url.findByIdAndUpdate(id, { origin })
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.send('error ' + error)
    }
}

const redirectUrl = async (req, res) => {
    
    const { shortURL } = req.params
    
    try {
        const redirectUrl = await Url.findOne({shortURL: shortURL})
        res.redirect(redirectUrl.origin)
    } catch (error) {
        console.log(error)
        res.send('error ' + error)
    }
}

module.exports = {
    readUrl,
    addUrl,
    deleteUrl,
    editUrlForm,
    editUrl,
    redirectUrl
}
