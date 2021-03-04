const auth_token = require('jsonwebtoken');
const config = require('./config/config');

const auth = (req, res, next) => {

    const token_header = req.headers.auth_token;

    console.log(req.headers.auth_token);

    if (!token_header) return res.status(401).send({ error: "Token Invalido" });

    auth_token.verify(token_header, 'lucasbergamo', (err, decoded) => {
        if (err) return res.send({ error: 'token invalido!' });
        res.locals.auth_data = decoded;
        return next();
    })
}

module.exports = auth;