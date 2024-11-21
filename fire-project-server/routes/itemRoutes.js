const express =  require("express");
const multer = require('multer');
const path = require("path");

const { getItems, createItems, updateItems, deleteItems } = require("../controller/itemController");


const itemRoutes = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});

const upload = multer({ storage });


// recordRoutes.get('/get', getRecords);
// recordRoutes.post('/add', upload.single('image'), createRecord);
// recordRoutes.put('/update/:id', upload.single('image'), updateRecord);
// recordRoutes.delete('/delete/:id', deleteRecord);

itemRoutes.get('/', getItems);
itemRoutes.post('/', upload.single('image'), createItems);
itemRoutes.put('/:id', upload.single('image'), updateItems);
itemRoutes.delete('/:id', deleteItems);


module.exports = itemRoutes;