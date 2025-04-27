const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {type: String, required: true},
    email:{type: String, unique: true, required: true},
    phone: {type: String, required: true},
    role: {type: String, required: true},
    organization: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    confrimPassword: {type: String, required: true}
})

module.exports = mongoose.model('users',userSchema)