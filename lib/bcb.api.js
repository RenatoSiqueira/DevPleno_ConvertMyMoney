const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = (url) => axios.get(url)
const extractCotacao = (res) => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1) + '-' + today.getDay() + '-' + today.getFullYear()
}

const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async () => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url) //'07-17-2019'
        const cotacao = extractCotacao(res)
        return cotacao
    } catch (err) {
        return ''
    }
}

//axios.get(url).then(res => console.log(res.data.value[0].cotacaoVenda))

module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao }),
    extractCotacao,
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}