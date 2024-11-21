const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
    image: String,
    text: String,
    itemName: String,
    price: String,
    capacity: String,
    batchNo: String,
    quantity: String,
  });
  
const Item = mongoose.model('Item', itemSchema);


module.exports = Item;