const api = require('./bcb.api')
const axios = require('axios')

jest.mock('axios')

test('GetCotacaoApi', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }

    axios.get.mockResolvedValue(res)
    api.getCotacaoAPI('url').then(response => {
        expect(response).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('extratCotacao', () => {
    const cotacao = api.extractCotacao({
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    })
    expect(cotacao).toBe(3.90)
})

describe('getToday', () => {
    const RealDate = Date

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('1-2-2019')
    })
})

test('getURL', () => {
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getCotacao', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 }
            ]
        }
    }

    const getToday = jest.fn()
    getToday.mockReturnValue('01-01-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(res)

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.9)

    api.pure
        .getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao })()
        .then(res => {
            expect(res).toBe(3.9)
        })

})

test('getCotacao', () => {
    const res = {}

    const getToday = jest.fn()
    getToday.mockReturnValue('01-01-2019')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockReturnValue(Promise.reject('err'))

    const extractCotacao = jest.fn()
    extractCotacao.mockReturnValue(3.9)

    api.pure
        .getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao })()
        .then(res => {
            expect(res).toBe('')
        })

})