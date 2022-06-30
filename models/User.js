const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const { Schema } = mongoose

const userSchema = new Schema ({
    username: {
        type: String,
        lowercase: true,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        idex: {unique: true}
    },
    password: {
        type: String,
        required: true
    },
    tokenConfirm: {
        type: String,
        default: null
    },
    cuentaConfirmada: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function(next) { //The functions have access to "this", "arrow" functions do not
    const user = this

    if(!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        next()
    } catch (error) {
        console.log(error)
        throw new Error("Password encoding error")
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this
    return await bcrypt.compare(candidatePassword, user.password)
}
 
module.exports = mongoose.model('User', userSchema)