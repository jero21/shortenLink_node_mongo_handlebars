const mongoose = require('mongoose')
mongoose
    .connect(process.env.URI)
    .then(() => console.log("connected to mongodb"))
    .catch((e) => console.log("failed to connect mongodb " + e))