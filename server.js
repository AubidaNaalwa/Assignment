const express = require('express')
const path = require('path')
const app = express()
const api = require('./server/route/api')
const mongoose = require('mongoose')

const url = "mongodb+srv://AubidaNaalwa:Admin1234@cluster0.cvbqr.mongodb.net/Anime?retryWrites=true&w=majority"
mongoose.connect(process.env.URI || url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('Database Connected Succefully '))
    .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)

app.use(express.static(path.join(__dirname, 'build')))

const port = 8080

app.listen((process.env.PORT || port), function () {
    console.log(`server runs on port : ${port}`)
})