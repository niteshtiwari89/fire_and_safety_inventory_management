const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const itemRoutes =require('./routes/itemRoutes');

const recordRoutes = require("./routes/recordRoutes")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads')); // Serve uploaded files

// // Set up multer for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
//   },
// });

// const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb+srv://vedantghole06:vedman07@cluster0.kfuhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

app.get("/", (req, res) => {
    res.send("hello world")
})

app.use("/items",itemRoutes)
app.use("/record",recordRoutes)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
