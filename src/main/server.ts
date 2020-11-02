import { MongoHelper } from '../infra/criptography/db/mongodb/helpers/mongoHelper'
import config from './config/env'

MongoHelper.connect(config.mongoUrl).then(async () => {
  const app = (await import('./config/app')).default

  app.listen(config.port, () => {
    console.log(`server is running on http://localhost:${config.port}`)
  })
}).catch(console.error)
