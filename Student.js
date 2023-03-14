const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
    name: String,
    prices: Number,
    brand:String,
    category:String,
    image:{
        data:Buffer,
        contentType:String
    },
});


module.exports = mongoose.model('product', StudentSchema);
 