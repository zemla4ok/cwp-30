const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('./config.json');
const helpers = require('./helpers');
const db = require('./models')(Sequelize, config);

const authCookie = '__sso_token';
const port = 8000;

let code;

const app = express();

app.use(cookieParser());
app.use(bodyParser());

app.get('/login', (req, res) => {
    const token = req.cookies[authCookie];

    if(helpers.verifyToken(token)){
        res.redirect(req.query.callback + `?source/protected-resource&token=${token}`);
    }
    else{
        res.sendFile(__dirname + '/login.html');
    }
})

app.listen(port, async () => {
    console.log('sso is running on port ' + port);
})