const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// LOAD CONFIG
dotenv.config({
  path: path.resolve(__dirname, './config.env'),
})

// Connecting to Database
const dbconnect = mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log('Successfully connected to db')
  })
  .catch(function (err) {
    console.log(err)
  })

module.exports = dbconnect
