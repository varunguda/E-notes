const connectToMongo = require('./db');
connectToMongo();


const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

