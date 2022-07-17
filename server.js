//depenticies
const express = require('express')
require('dotenv').config()
//configurations
const app = express()
const PORT = process.env.PORT
//routes
app.get('/', function (req, res) {
    res.send('Welcome to the bread app')
})
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)
app.listen(PORT, function () {
    console.log('up and running on port ', PORT)
})