import request from 'supertest'
import app from '../config/app'

describe('Body parser middleware', () => {
  test('Should parse body as JSON', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })

    const data = { email: 'email@email.com' }

    await request(app).post('/test-body-parser').send(data).expect(data)
  })
})
