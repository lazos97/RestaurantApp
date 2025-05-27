import { Internal } from '../errors/internal.js'
import jwt from 'jsonwebtoken'

export class JWT {
  constructor() {}
  createToken(payload) {
    try {
      const { sign } = jwt
      const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
      })

      return token
    } catch (error) {
      throw new Internal(error.message)
    }
  }

  validToken(token) {
    const { verify } = jwt
    return verify(token, process.env.JWT_SECRET)
  }

  createTokenUser(user) {
    return {
      userId: user._id.toString(),
      email: user.email,
      name: user.name
    }
  }
}
