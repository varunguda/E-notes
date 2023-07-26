const jwt = require("jsonwebtoken");
require("dotenv").config();

const fetchUserId = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token!" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token!" });
  }
};

module.exports = fetchUserId;
