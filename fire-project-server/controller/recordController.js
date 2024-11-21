const Record = require('../models/recordModal');
const XLSX = require('xlsx');

// Get all records
const getRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};

// Create a new record
const createRecords = async (req, res) => {
  try {
    const newRecord = new Record({ ...req.body });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error: error.message });
  }
};

// Download records as Excel with Serial Numbers
const downloadRecords = async (req, res) => {
  try {
    // Fetch all records from the database
    const records = await Record.find();

    // Format data for Excel and add Serial Number
    const data = records.map((record, index) => ({
      SerialNo: index + 1,  // Add serial number starting from 1
      BatchNo: record.batchNo,
      Date: record.date,
      ItemName: record.itemName,
      Price: record.price,
      Type: record.type,
      Quantity: record.quantity,
      Size: record.size,
    }));

    // Create a new Excel workbook and add data to a sheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Records');

    // Convert the workbook to a buffer
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Set response headers to download the Excel file
    res.setHeader('Content-Disposition', 'attachment; filename="records_with_serial_numbers.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: 'Error generating Excel file', error: error.message });
  }
};

module.exports = {
  getRecords,
  createRecords,
  downloadRecords,  // Export the download function
};