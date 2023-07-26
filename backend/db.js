const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://dwin:eRLz6HE6EmDPFO75@enotes.jamwfum.mongodb.net/enotes?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('CONNECTED TO MONGO');
  } catch (error) {
    console.error('ERROR CONNECTING TO MONGO:', error);
  }
};

module.exports = connectToMongo;
