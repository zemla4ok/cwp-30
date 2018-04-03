const jwt = require('jsonwebtoken');

function verifyToken(token){
    try{
        const user = jwt.verify(token, 'secret');

        return user;
    }
    catch(err){
        return false;
    }
}

module.exports = {
    verifyToken,
}