//depenticies
const express = require('express')
require('dotenv').config()
const methodOverride = require('method-override')
const mongoose = require('mongoose')


//configurations
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

const app = express()
const PORT = process.env.PORT
// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



//routes
app.get('/', function (req, res) {
    res.send('Welcome to the bread app')
})
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)
app.listen(PORT, function () {
    console.log('up and running on port ', PORT)
})
// 404 Page
app.get('*', (req, res) => {
    res.send('404')
})
