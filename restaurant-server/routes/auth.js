import express from 'express'
import { AuthController } from '../controllers/auth.js'
import { isLoggedIn, isNotLoggedIn } from '../middlewares/auth.js'

const router = express.Router()
const controller = new AuthController()

// bind method binds the req and res object to the controllers methods
router.post('/register', isLoggedIn, controller.register.bind(controller))
router.post('/login', isLoggedIn, controller.login.bind(controller))
router.get('/logout', isNotLoggedIn, controller.logout.bind(controller))

export default router
