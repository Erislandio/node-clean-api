import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  url: null as string,
  client: MongoClient,
  async connect (uri: string): Promise<void> {
    this.url = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  }

}
