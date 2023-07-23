const express = require('express');
const routes = express.Router();
const User = require('../models/Users')

routes.post('/', (req, res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body)
})

module.exports = routes;