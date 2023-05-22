const jwt = require("jsonwebtoken");

const tokenGeneration =  (user, req,expiresIn) => {
  const { ip } = req;
  const userInfo = {
    _id: user._id,
    ip,
    name: user.username,
    role:user.role
  };
  const token =  jwt.sign(userInfo, process.env.SECRETE_KEY, {
    expiresIn:expiresIn,
  });
  return token;
};
module.exports = {
  tokenGeneration,
};
