const convert = (cotacao, quantidade) => {
    return cotacao * quantidade
}

const toMoney = valor => {
    return parseFloat(valor).toFixed(2)
}

module.exports = {
    convert,
    toMoney
}