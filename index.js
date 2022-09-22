const express = require('express')
const cors = require('cors')
const { authDoc } = require('./src/helpers/spreadSheet')
const { auth, getRows, addRow } = require('./src/helpers/middleware')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ done: true, message: 'Hello World!' })
})

app.get('/rows/:sheet_id', getRows, (req, res) => {
  const { rows } = req
  res.send({ done: true, rows })
})

app.post('/rows/:sheet_id', addRow, (req, res) => {
  const { done } = req
  if (done) {
    res.send({ done: true })
  }
})

app.listen(3000, () => {
  console.log('Server is up')
  authDoc().then(console.log('connected to doc'))
})