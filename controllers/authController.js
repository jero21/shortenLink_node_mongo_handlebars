const User = require('../models/User')

const loginForm = (req, res) => {
    res.render("login")
}

const registerForm = (req, res) => {
    res.render("register")
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(user) throw new Error ('User already exists')

        const newUser = new User({
            username, 
            email,
            password
        })
        res.json(newUser)
        await newUser.save()
        //res.send("user created")
        
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = {
    loginForm,
    registerForm,
    registerUser
}
