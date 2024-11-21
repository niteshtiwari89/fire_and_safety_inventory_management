const mongoose = require("mongoose");


const recordSchema = new mongoose.Schema({
    batchNo: String,
    date: String,
    itemName: String,
    price: Number,
    type: String,
    quantity: Number,
    size: String,
  });
  
const Record = mongoose.model('Record', recordSchema);


module.exports = Record;