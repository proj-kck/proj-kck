const express = require('express');
const session = require('express-session');
const app = express();
// const { cartRouter } = require('./src/')

app.use(express.json());

app.use(
    session({
        secret: "secrets",
        resave: false,
        saveUninitialized: false
    })
)
