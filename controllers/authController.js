const User = require('../models/User')
const { nanoid } = require('nanoid')

const loginForm = (req, res) => {
    res.render("login")
}

const registerForm = (req, res) => {
    res.render("register")
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        let user = await User.findOne({email})
        if(user) throw new Error('User already exists')

        user = new User({
            username, 
            email,
            password,
            tokenConfirm: nanoid(8)
        })
        await user.save()

        //TODO: send email with link confirmation account

        res.redirect("/auth/login")
        
    } catch (error) {
        res.json({error: error.message})
    }
}

const confirmAccount = async (req, res) => {
    const { token } = req.params
    try {
        const user = await User.findOne({ tokenConfirm: token })

        if(!user) throw new Error("user does not exist")

        user.cuentaConfirmada = true
        user.tokenConfirm = null
        await user.save()

        res.redirect('/auth/login')
    } catch (error) {
        res.json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const {email, password } = req.body
    try {
        const user = await User.findOne({email: email})
        if(!user) throw new Error("email does not exist")

        if(!user.cuentaConfirmada) throw new Error("the account has not been confirmed")

        if(!await user.comparePassword(password)) throw new Error("Invalid account")

        res.redirect("/")
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmAccount,
    loginUser
}
