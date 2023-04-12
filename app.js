const express = require('express')
const app = express()
const port = 3500
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
var cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash');

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//connectdb
connectDb()
//this is used for to get data
app.use(express.urlencoded({extended:false}))

//for file upload
app.use(fileUpload({useTempFiles:true}));

// for flash message
app.use(session({
  secret: 'secret',
  cookie: { maxAge:60000},
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

//router load
app.use('/',web)

//ejs setup
app.set('view engine', 'ejs')





//public folder setup
app.use(express.static("public"));







//server creat
app.listen(port, () => {
    console.log('server start localhost:3500')
  })