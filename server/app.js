const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
app.use(require('./router/auth'));

const port = process.env.PORT;




app.get('/', function (req, res) {
    res.send("Hello world from the server!")
})

app.get('/about', function (req, res) {
    res.send("Hello world from the about server!")
})
app.get('/contact', function (req, res) {
    res.send("Hello world from the contact server!")
})
app.get('/login', function (req, res) {
    res.send("Hello world from the login server!")
})
app.get('/signup', function (req, res) {
    res.send("Hello world from the signup server!")
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})