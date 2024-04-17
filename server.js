// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('mongodb://localhost/sample_data', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Sample Data Model
const SampleData = mongoose.model('SampleData', {
  timestamp: Date,
  value: Number
});

// Middleware
app.use(bodyParser.json());

// Import Sample Data Route
app.post('/import-data', async (req, res) => {
  try {
    const data = req.body;
    await SampleData.insertMany(data);
    res.status(201).send('Sample data imported successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
