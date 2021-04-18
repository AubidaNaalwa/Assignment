const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

const Users = mongoose.model('users', users);

module.exports = Users;