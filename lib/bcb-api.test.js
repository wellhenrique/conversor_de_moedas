const api = require('./bcb-api')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: 5.56 }
      ]
    }
  }
  axios.get.mockResolvedValue(res)
  api.getCotacaoAPI('url').then( resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})
test('extrarirCotacao', () => {
  const cotacao = api.extrarirCotacao({
    data: {
      value: [
        { cotacaoVenda: 5.56 }
      ]
    }
  })
  expect(cotacao).toEqual(5.56)
})

describe('toDay', () => {
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

  test('toDay', () => {
    mockDate('2000-01-01T12:00:00z')
    const today = api.toDay()
    expect(today).toBe('1-1-2000')
  })
})

test('getURL', () => {
  const url = api.getUrl()
  expect(url).toBe(url)
})

test('getCotacao', () => {
  const res = {
    data: {
      value: [
        { cotacaoVenda: 5.56 }
      ]
    }
  }

  const toDay = jest.fn()
  toDay.mockReturnValue('01-01-2021')
  const getUrl = jest.fn()  
  getUrl.mockReturnValue('url')
  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockResolvedValue(res)
  const extrarirCotacao = jest.fn()
  extrarirCotacao.mockReturnValue(5.56)

  api.pure
    .getCotacao({ toDay, getUrl, getCotacaoAPI, extrarirCotacao })()
    .then(res => {
      expect(res).toBe("5.56")
    })
})

test('getCotacao', () => {
  const res = {
  }

  const toDay = jest.fn()
  toDay.mockReturnValue('01-01-2021')
  const getUrl = jest.fn()  
  getUrl.mockReturnValue('url')
  const getCotacaoAPI = jest.fn()
  getCotacaoAPI.mockReturnValue(Promise.reject('error'))
  const extrarirCotacao = jest.fn()
  extrarirCotacao.mockReturnValue(5.56)

  api.pure
    .getCotacao({ toDay, getUrl, getCotacaoAPI, extrarirCotacao })()
    .then(res => {
      expect(res).toBe("")
    })
})















