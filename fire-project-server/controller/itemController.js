const Items = require('../models/itemModal');

// Get all records
const getItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records' });
  }
};

// Create a new record
const createItems = async (req, res) => {
  try {
    const newItems = new Items({
      ...req.body,
      image: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '',
    });
    await newItems.save();
    res.status(201).json(newItems);
  } catch (error) {
    res.status(500).json({ message: 'Error creating record' });
  }
};

// Update an existing record
const updateItems = async (req, res) => {
  try {
    const updatedItemsData = {
      ...req.body,
      ...(req.file && { image: `http://localhost:5000/uploads/${req.file.filename}` }),
    };
    const updatedItems = await Record.findByIdAndUpdate(req.params.id, updatedItemsData, { new: true });
    res.json(updatedItems);
  } catch (error) {
    res.status(500).json({ message: 'Error updating record' });
  }
};

// Delete a record
const deleteItems = async (req, res) => {
  try {
    const {id} = req.params;

    const item = await Items.findByIdAndDelete(id)

    // const deletedItem  = await Items.findByIdAndDelete(itemId);
    
    if(!item){
      return res.status(404).json({message: "Item not Found"})
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record' });
  }
};

module.exports = {
  getItems,
  createItems,
  updateItems,
  deleteItems,
};
