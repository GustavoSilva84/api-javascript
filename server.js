const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.use(cors())

let bancoDeDados = [];

app.get('/buscar', (req, res) => {

    res.json(bancoDeDados)

});

app.post('/save', async (req, res) => {

    let dados = req.body
    console.log(JSON.stringify(dados))
    bancoDeDados.push(dados)
    res.json(dados)

});

app.listen(8282)
