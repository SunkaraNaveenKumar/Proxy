// const  {MongoClient} = require('mongodb')
const mongoose = require("mongoose");

const configureDb = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const url = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.chr3g4p.mongodb.net/?retryWrites=true&w=majority`;
  // const url = `mongodb+srv://sunkaranaveensunkara:naveen@cluster0.chr3g4p.mongodb.net/?retryWrites=true&w=majority`;
  // mongoose.set("debug", true);
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("MongoDB err :",err);
    });
};

module.exports = configureDb;
