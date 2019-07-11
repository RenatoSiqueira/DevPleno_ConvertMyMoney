const convert = require('./convert')

test('Convert cotacao 4 and quantidade 4', () => {
    expect(convert.convert(4, 4)).toBe(16)
})

test('Convert cotacao 0 and quantidade 4', () => {
    expect(convert.convert(0, 4)).toBe(0)
})

test('toMoney converts Float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('toMoney converts String', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})