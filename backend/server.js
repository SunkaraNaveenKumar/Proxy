require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./config/routes");


// const {connectToDb,getDb} = require('./config/dataBase')
const configureDb = require("./config/dataBase");
const port = process.env.PORT || 3005;
configureDb();
app.use(cors());
// let db
// connectToDb((err)=>{
// if(!err){
//     app.listen(port, () => {
//         console.log("server is running");
//       });
//       db=getDb()
// }else{

// }
// })
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  console.log(`${req.method}-${req.url}-${req.ip}-${Date.now}`);
  next();
});
app.use(router);
app.listen(port, () => {
  console.log("server is running");
});
