import { JWT } from '../helpers/JWT.js'
import { BadRequest } from '../errors/bad-request.js'
import { Forbidden } from '../errors/forbidden.js'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || ''
  if (!token) throw new Forbidden('Access denied! No user found.')

  const jwt = new JWT()

  try {
    const payload = jwt.validToken(token)

    const user = await User.findById(payload.userId)
    if (!user) throw new BadRequest('Token problem...')

    req.currentUser = {
      userId: user._id,
      name: user.name,
      email: user.email
    }

    next()
  } catch (error) {
    throw new Forbidden('Access denied!')
  }
}

export const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || ''
  if (token) throw new BadRequest('You are all ready logged in')
  next()
}

export const isNotLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || ''
  if (!token) throw new BadRequest('There is no user to logout')
  next()
}
