const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config/config');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires });
};


router.get('/', async(req, res) => {

    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (error) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!' });
    }
});


router.post('/create', async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes' });

    try {
        if (await Users.findOne({ email }))
            res.send({ error: 'Usuário já registrado!' });

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send({ user, token: createUserToken(user.id) });
    } catch (err) {
        return res.send(400).send({ error: err.data });
    }
});

router.post('/auth', async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(401).send({ error: 'Dados insuficientes' });

    try {

        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.status(401).send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) return res.status(401).send({ error: "erro em autenticar uusuário!" });

        user.password = undefined;
        return res.send(200).send({ user, token: createUserToken(user.id) });

    } catch (err) {
        return res.status(500).send({ error: err.error });
    }
});


router.post('/createold_sem async', (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes' });

    Users.findOne({ email }, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar usuarios!' });
        if (data) return res.send({ error: 'Usuário já registrado!' });

        Users.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Erro ao criar usuário!' });

            data.password = undefined;
            return res.send(data);
        });
    });
});



router.post('/autholdprocess', (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: "dados insuficientes!" });

    Users.findOne({ email }, (err, data) => {
        if (err) return res.send({ error: "Erro ao buscar usuário" });
        if (!data) return res.send({ error: "Usuário não registrado" });

        bcrypt.compare(password, data.password, (err, same) => {
            if (!same)
                return res.send({ error: "erro em autenticar uusuário!" });

            data.password = undefined;
            return res.send(data);
        });

    }).select('+password');
});


module.exports = router;


/*

status code corretos

resposta 200 - ok

resposta 201 - criado created 

resposta 202 -  accepted - aceitei a requisicao

resposta 400 - bad request deu ruim

resposta 401 -  autenticacao ..com erro sem token  / temporario

resposta 403 - proibido - autorizacao nao esta autorizado

resposta 500 - erro interno


resposta 501 - não implementado

resposta 503 - servico indisponivel. em manutencao


*/