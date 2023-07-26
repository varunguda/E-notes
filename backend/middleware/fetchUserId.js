const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
require("dotenv").config();

const fetchUserId = async(req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token!" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(data.user.id);
    if(!user){
      return res
      .status(401)
      .send({ error: "Please authenticate using a valid token!" });
    }
    req.user = data.user;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token!" });
  }
};

module.exports = fetchUserId;
