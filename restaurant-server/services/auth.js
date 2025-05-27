import { JWT } from '../helpers/JWT.js'
import User from '../models/User.js'
import { Unauthorized } from '../errors/unauthorized.js'

export class AuthService {
  jwt
  constructor() {
    this.jwt = new JWT()
  }

  async login(data) {
    const { email, password } = data

    const user = await User.findOne({ email })
    if (!user) throw new Unauthorized('The email or password are wrong')

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect)
      throw new Unauthorized('The email or password are wrong')

    return this.structureUser(user)
  }

  async register(data) {
    const user = await User.create(data)
    return this.structureUser(user)
  }

  structureUser(user) {
    const tokenUser = this.jwt.createTokenUser(user)
    const token = this.jwt.createToken(tokenUser)

    return {
      user: tokenUser,
      token
    }
  }

  logout() {
    return 'User logged out!'
  }
}
