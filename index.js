const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 3003

const { convert, toMoney } = require('./lib/convert')
const apiBCB = require('./lib/bcb.api')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    const cotacao = await apiBCB.getCotacao()
    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    if (cotacao && quantidade) {
        const conversao = convert(cotacao, quantidade)
        res.render('cotacao', {
            cotacao: toMoney(cotacao),
            quantidade: toMoney(quantidade),
            conversao: toMoney(conversao),
            error: false
        })
    } else {
        res.render('cotacao', {
            error: 'Valores Inválidos'
        })
    }
})

app.listen(port, err => {
    if (err)
        console.log('Erro ao Iniciar:', err)
    else
        console.log('Servidor Iniciado em ' + port)
})