const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


router.get('/', auth, (req, res) => {

    console.log(res.locals.auth_data);
    return res.send({
        message: "Metodo get raiz"
    });
})


router.post('/', auth, (req, res) => {
    return res.send({ message: 'Metodo post raiz' })
})


module.exports = router;