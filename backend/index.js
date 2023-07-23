const connectToMongo = require('./db');
connectToMongo();


const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello home!')
// })

app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
