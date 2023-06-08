const jwt = require("jsonwebtoken");
const users = require("../models/users");
const admins = require("../models/admins");
const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  // console.log(req.headers)
  try {
    const data = jwt.verify(token, process.env.SECRETE_KEY);
    if (req.ip === data.ip) {
      if (data.role === "admin") {
        const admin = await admins.findById(data._id);
        if (admin) {
          req.admin = admin;
          next();
        } else {
          throw new Error({ errors: "Invalid admin" });
        }
      } else {
        const user = await users.findById(data._id);
        if (user) {
          req.user = user;
          next();
        } else {
          throw new Error({ errors: "Invalid User" });
        }
      }
    } else {
      throw new Error({ errors: "User is Not Authorized please login again" });
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = authenticate;
