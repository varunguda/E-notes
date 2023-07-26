const express = require('express');
const { body, validationResult } = require('express-validator');
const routes = express.Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "@s8t!fg92^bs%!hs*^"

routes.post('/createuser', [

    body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (val) => {
      try{
        const user = await Users.findOne({ email: val });
        if (user) {
          return Promise.reject('This email is already registered');
        }
        return Promise.resolve()
      }catch(err){
        console.error(err);
        return Promise.reject('Error checking for username existence');
      }
    }),

    body('username')
    .isLength({min:3}).withMessage('Username must have atleast 3 characters')
    .custom((val)=>{
        const userNameFormat = (name) => {
            // Regular expression to check if the name has only lowercase letters, numbers and (_)
            const lowercaseRegex = /^(?!^\d)(?=.*[a-z])^[a-z\d_]+$/;
          
            // Test the name against the regular expression
            return lowercaseRegex.test(name);
        }

        const checkCommon = async (name) =>{
          try{
            const exist = await Users.findOne({ username: name })
            if(exist){
              return Promise.reject('Username already exists!');
            }
            return Promise.resolve();
          }catch(err){
            console.error(err);
            return Promise.reject('Error checking for username existence');
          }
        }

        if(!userNameFormat(val)){
          return Promise.reject('Invalid Username');
        }
        else {
          return checkCommon(val); 
        }
    }),

    body('password')
    .bail()
    .isLength({ min: 8}).withMessage('A password must have atleast contain 8 cahracters')
    .custom((val)=>{
      const passwordFormat = (pass) =>{
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|~-]).+$/;
        return regex.test(pass);
      }
      if(!passwordFormat(val)){
        return Promise.reject('A password must contain atleast 1 Special character, 1 Lowercase alphabet, and 1 Uppercase alphabet');
      }
      return Promise.resolve();
    }),

    body('phoneNo')
    .optional()
    .isLength({min:10, max:10}).withMessage('Please enter a valid Phone number')

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const saltRounds = 10;
  const securedPass = await bcrypt.hash(req.body.password, saltRounds);

  try{
    const user = await Users.create({
      username: req.body.username,
      password: securedPass,
      email: req.body.email,
      fullName: req.body.fullName,
      phoneNo: req.body.phoneNo,
    });

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.send({authToken})

  }catch(err){
    console.log(err.message);
    res.status(500).send('{ Something went wrong! }')
  }
});

module.exports = routes;
