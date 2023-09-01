const connectToMongo = require('./db');

const express = require('express')
const port = 5000
const { config } = require("dotenv")
const cors = require('cors');

config({
  path: './config.env'
})

connectToMongo();
const app = express()

app.use(cors());
app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

