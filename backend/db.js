const mongoose = require('mongoose');

const mongoUri = "mongodb://localhost:27017";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Mongo');
  } catch (error) {
    console.error('Error connecting to Mongo:', error);
  }
};

module.exports = connectToMongo;
