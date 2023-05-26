const mongoose = require('mongoose')


const AdminSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: 'pending'
    },
    comment: {
        type: String,

    }


}, { timestamps: true })


const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel