var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema({
    code: Number,
    title: String,
    imgUrl: String,
    writings: Object
});

module.exports = mongoose.model('Board', boardSchema);
