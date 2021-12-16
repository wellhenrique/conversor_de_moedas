const express = require('express')
const app = express()
const path = require('path')

//conversor de moeda
const convert = require('./lib/convert')
//puxo a API do Banco Central do Brasil
const apiBCB = require('./lib/bcb-api.js')

//Define o a engine padrão para ejs
app.set('view engine', 'ejs')
//deine um diretorio padrao a partir do views
app.set('views', path.join(__dirname, 'views'))

//define a pasta publica
app.use(express.static(path.join(__dirname, 'public')))

//Renderiza a view Home na pagina principal e passa a cotacao inicial(caso tenha)
app.get('/', async(req, res) => {
  const cotacao = await apiBCB.getCotacao()
  res.render('home', {
    cotacao
  })
})

//Pagina de resultado da Cotaçãp
app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query
  if(cotacao  && quantidade && ((quantidade + cotacao) !== NaN)) {
    const conversao = convert.convert(cotacao, quantidade)
    res.render('cotacao', {
      error: false,
      conversao: convert.aMoney(conversao),
      cotacao: convert.aMoney(cotacao),
      quantidade: convert.aMoney(quantidade),
    })
  }else{
    res.render('cotacao', {
      error: 'Valores invalidos'
    })
  }
})

//cria um servidor na porta :3000
app.listen(3000, (err) => {
  if(err) {
    console.log('Não foi possivel se conectar ao servidor!!!')
  } else {
    console.log('Servidor on-line')
  }
})