const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect( process.env.MONGO_URI , { useNewUrlParser: true, useUnifiedTopology: true, dbName: "E-Notes" });
    console.log('CONNECTED TO MONGO');
  } catch (error) {
    console.error('ERROR CONNECTING TO MONGO:', error);
  }
};

module.exports = connectToMongo;
