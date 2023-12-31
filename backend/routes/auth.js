const express = require("express");
const { body, validationResult } = require("express-validator");
const routes = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUserId = require("../middleware/fetchUserId");
require("dotenv").config();

routes.post(
  "/createuser",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (val) => {
        try {
          const user = await Users.findOne({ email: val });
          if (user) {
            return Promise.reject("This email is already registered");
          }
          return Promise.resolve();
        } catch (err) {
          console.error(err);
          return Promise.reject("Error checking for username existence");
        }
      }),

    body("username")
      .isLength({ min: 3, max: 14 })
      .withMessage("Username must have atleast 3 characters")
      .custom((val) => {
        const userNameFormat = (name) => {
          // Regular expression to check if the name has only lowercase letters, numbers and (_)
          const lowercaseRegex = /^(?!^\d)(?=.*[a-z])^[a-z\d_]+$/;

          // Test the name against the regular expression
          return lowercaseRegex.test(name);
        };

        const checkCommon = async (name) => {
          try {
            const exist = await Users.findOne({ username: name });
            if (exist) {
              return Promise.reject({userExist:true,message:"Username already exists!"});
            }
            return Promise.resolve();
          } catch (err) {
            console.error(err);
            return Promise.reject("Error checking for username existence");
          }
        }

        if (!userNameFormat(val)) {
          return Promise.reject("Invalid username");
        } else {
          return checkCommon(val);
        }
      }),

    body("password")
      .bail()
      .isLength({ min: 8, max: 24 })
      .withMessage("A password must contain atleast 8 characters")
      .custom((val) => {
        const passwordFormat = (pass) => {
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|~-]).+$/;
          return regex.test(pass);
        };
        if (!passwordFormat(val)) {
          return Promise.reject(
            "A password must contain atleast 1 Special character, 1 Lowercase alphabet, and 1 Uppercase alphabet"
          );
        }
        return Promise.resolve();
      }),

    body("phoneNo")
      .optional()
      .isLength({ min: 10, max: 10 })
      .withMessage("Please enter a valid Phone number"),

    body("fullName")
      .isLength({ min: 3, max: 20 })
      .withMessage("Full name must have atleast 5 characters"),
  ],
  async (req, res) => {
    let isSuccess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: isSuccess, errors: errors.array() });
    }

    const saltRounds = 10;
    const securedPass = await bcrypt.hash(req.body.password, saltRounds);

    try {
      const user = await Users.create({
        username: req.body.username,
        password: securedPass,
        email: req.body.email,
        fullName: req.body.fullName,
        phoneNo: req.body.phoneNo
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      isSuccess = true;
      res.json({ success: isSuccess , authToken });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message, message: "Internal Server Error" });
    }
  }
);

routes.post(
  "/login",
  [
    body("name").isLength({ min: 3 }).withMessage("Enter a valid username"),
    body("password")
      .isLength({ min: 1 })
      .withMessage("Password cannot be blank"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let isSuccess = false;
    try {
      const { name, password } = req.body;
      const user = await Users.findOne({
        $or: [{ username: name }, { email: name }],
      });
      if (!user) {
        return res.json({success: isSuccess, message: "Wrong Username or password"});
      }
      const verified = await bcrypt.compare(password, user.password);
      if (!verified) {
        return res.json({success: isSuccess, message: "Wrong Username or password"});
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      isSuccess = true;
      return res.json({ success: isSuccess, authToken });
    } catch (err) {
      console.log(err);
      res.status(500).json({success: isSuccess, error: " Internal Server Error "});
    }
  }
);

routes.post("/getuser", fetchUserId, async (req, res) => {
  let isSuccess = false;
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: isSuccess, error: "User not found!" });
    }
    isSuccess = true
    return res.json({success: isSuccess, user});
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: isSuccess, error: "Internal Server Error" });
  }
});

// routes.post("/deleteuser", fetchUserId ,(req, res)=>{
//   try{
//     const userId = req.user.id;
//     console.log(userId)
//   }catch(err){

//   }
// })

module.exports = routes;
