import request from 'supertest'
import app from '../config/app'

describe('Content-type middleware', () => {
  test('Should return default content type as JSON', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send({})
    })

    await request(app).get('/test-content-type').expect('content-type', /json/)
  })

  test('Should return default content type as XML', async () => {
    app.get('/test-content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app).get('/test-content-type-xml').expect('content-type', /xml/)
  })
})
