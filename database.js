const mongoose = require("mongoose");

const connectDB = async () => {
  const PASSWORD = "xWvyCW8v8F4iDsAi";
  const DATABASE_NAME = "productsDB";
  const CONNECTION_URL = `mongodb+srv://Tahreer:${PASSWORD}@cluster0.58pn1.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
