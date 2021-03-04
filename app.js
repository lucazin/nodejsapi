const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');


const url = config.bd_String;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão do banco mongo');
})

mongoose.connection.on('disconnected', (err) => {
    console.log('Aplicação desconectada  do banco mongo');
});

mongoose.connection.on('connected', (err) => {
    console.log('conexão do banco mongo');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/user');


app.use('/', indexRoute);
app.use('/users', usersRoute);


app.listen(3000);
module.exports = app;