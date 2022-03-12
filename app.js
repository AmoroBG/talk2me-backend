// REQUIRE PACKAGES
const express = require('express')
const dotenv = require('dotenv')
// INTERNAL MODULES
const dbconnect = require('./server/database/dbconnection')
const userRoutes=require("./routes/user")

// LOAD CONFIG
dotenv.config({ path: './server/config/config.env' })

// APP
const app = express()

// DB CONNECTION
dbconnect

// MIDDLEWARE
// body-parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ROUTES
app.get("/", function(req, res){
  res.send('I should display a file here')
})
app.use("/users", userRoutes)


// SERVER
const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`)
})
