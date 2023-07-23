const connectToMongo = require('./db');
connectToMongo();


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello home!')
})
app.get('/num', (req, res) => {
  res.send('Hello num!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
