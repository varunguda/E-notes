const express = require('express');
const { body, validationResult } = require('express-validator');
const routes = express.Router();
const Users = require('../models/Users');

routes.post('/', [
    body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (val) => {
      return await Users.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject('This Email already exists');
        }
      });
    }),
    body('username')
    .isLength({min:3})
    .custom((val)=>{
        function userNameFormat(name) {
            // Regular expression to check if the name has only lowercase letters
            const lowercaseRegex = /^[a-z_]+$/;
          
            // Test the name against the regular expression
            return lowercaseRegex.test(name);
        }
        if(!userNameFormat(val)){
            return Promise.reject('invalid characters in the username');
        }
        return Promise.resolve()
    })
  
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Users.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    phoneno: req.body.phoneno,
  })
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = routes;
