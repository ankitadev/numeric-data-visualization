const mongoose = require("mongoose");

/**
 * MongoDB config
 */
const ConnectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error Connected: ${error.message}`);
    process.exit();
  }
};

module.exports = ConnectMongoDB;