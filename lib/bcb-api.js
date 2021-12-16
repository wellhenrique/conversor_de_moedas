const axios = require('axios');
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = data => axios.get(data)
const extrarirCotacao = res => res.data.value[0].cotacaoVenda 
const toDay = () => {
  const today = new Date()
  return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
}
const getCotacao = ({ toDay, getUrl, getCotacaoAPI, extrarirCotacao }) => async() => {
  try{
    const today = toDay()
    const url = getUrl(today)
    const res = await getCotacaoAPI(url)
    const cotacao = extrarirCotacao(res)
    return cotacao.toFixed(2)
  }catch(err) {
    return ''
  }
}


module.exports = {
  getCotacaoAPI,
  getCotacao: getCotacao( { toDay, getUrl, getCotacaoAPI, extrarirCotacao } ),
  getUrl,
  extrarirCotacao,
  toDay,
  pure: {
    getCotacao
  }
}