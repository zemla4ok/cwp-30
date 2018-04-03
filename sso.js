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

app.post('/login', async (req, res) => {
    const user = await db.user.findOne({
        where: {
            email: req.body.email
        },
        raw: true
    })

    if(!user || !bcrypt.compareSync(req.body.pass, user.password)){
        res.json({code: 400, message: 'Invalid data'});
    }
    else{
        codes = JSON.parse(user.codes);
        const num = Math.floor(Math.random() * 4) + 1;

        code = codes[num];

        const token = jwt.sign({
                'id': user.id
            },
            'secret',
            {
                expiresIn: 2*60
            });

        res.redirect(`/codes?source=/protected_resource&callback=localhost:7000/token&token=${token}&code=${num}`);
    }
})

app.get('/codes', (req, res) => {
    res.cookie("temptoken", req.query.token);

    res.sendFile(__dirname + '/codes.html');
})

app.post('/codes', (req, res) => {
    
})

app.listen(port, async () => {
    console.log('sso is running on port ' + port);
})