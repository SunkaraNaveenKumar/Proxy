const jwt = require("jsonwebtoken");
const users = require("../models/users");
const authenticate = async (req, res, next) => {
  const token = req.headers("Autherization").split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.SECRETE_KEY);
    if (req.ip === data.ip) {
      const user = await users.findById(data._id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.json({ errors: "Invalid Token" });
      }
    } else {
      res.json({ errors: "Invalid Token" });
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

module.exports = authenticate;
