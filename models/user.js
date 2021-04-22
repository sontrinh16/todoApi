const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const userSchema = new Schema({
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, trim: true, minlength: 6},
    userName: {type: String, required: true, trim: true},
});

userSchema.plugin(mongoosePaginate);

const userModel = mongoose.model('TodoUser', userSchema);

module.exports = userModel;