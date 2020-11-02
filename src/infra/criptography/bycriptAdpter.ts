import { Encrypter } from '../../data/protocols/encypter'
import bcrypt from 'bcrypt'

export class BcryptAdpter implements Encrypter {
  constructor (private readonly salt: number = 12) {}

  async encrypt (value: string): Promise<string> {
    await bcrypt.hash(value, this.salt)
    return new Promise(resolve => resolve(value))
  }
}
