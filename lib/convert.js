const convert = (cotacao, quantidade) => {
  return cotacao * quantidade
} 

const aMoney = valor => {
  return parseFloat(valor).toFixed(2)
}

module.exports = {
  convert,
  aMoney
}