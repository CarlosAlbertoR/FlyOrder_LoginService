const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const establishmentSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    NIT: { type: String, unique: true, required: true },
    nameAdmin: { type: String, unique: true, required: true },

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

establishmentSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

establishmentSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('establishment', establishmentSchema);