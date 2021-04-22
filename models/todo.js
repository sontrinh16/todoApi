const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const todoSchema = new Schema({
    text: {type: String, required: true, trim: true.valueOf, minlength:6},
    checked: {type: Boolean, default: false},
    belongTo: {type: Schema.Types.ObjectId, ref: 'User', default: null}
});

todoSchema.plugin(mongoosePaginate);

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;