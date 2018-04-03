const express = require('express');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');

const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const data = require('./models/data');
const helpers = require('./helpers');

const authCookie = '__service_token';
const port = 7000;

const app = express();

app.use(cookieParser());

app.get('/protected_resource', async function(req, res) {
    const token = req.cookies[authCookie];
    const userToken = helpers.verifyToken(token);
    if(userToken){
        const user = await db.user.findById(userToken.id);

        res.json(user);
    }
    else{
        res.redirect('http://localhost:8000/login?source=/protected-resource&callback=localhost:7000/token');
    }
})

app.get('/token', (req, res) => {
    res.cookie(authCookie, req.query.token);

    res.redirect(req.query.source);
})

app.listen(port, async () => {    
    await data(db);

    console.log('Server is running on port ' + port);
})