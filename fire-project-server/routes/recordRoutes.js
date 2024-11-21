const express = require("express");
const { getRecords, createRecords, downloadRecords } = require("../controller/recordController");

const recordRoutes = express.Router();

recordRoutes.get('/', getRecords);
recordRoutes.post('/', createRecords);
recordRoutes.get('/download', downloadRecords);  // Route for downloading Excel

module.exports = recordRoutes;