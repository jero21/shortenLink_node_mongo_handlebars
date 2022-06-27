const express = require("express")
const { create } = require("express-handlebars") // template frontend
require('dotenv').config() // .env
require("./database/db.js") // connect to mongodb

const app = express()

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
})
app.engine(".hbs", hbs.engine)
app.set("view engine", ".hbs")
app.set("views", "./views")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use("/", require('./routes/home.js'))
app.use("/auth", require('./routes/auth.js'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('funcionando en puerto ' + PORT))
