import { Router } from 'express'
import {
  handleUserLogin,
  handleUserSignUp,
  handleUserTokenValidation,
  handleGetUserData,
} from '../controller/user.js'
import authenticateToken from '../middleware/authentication.js'

const router = Router()

router.get('/', authenticateToken, handleGetUserData)

router.post('/login', handleUserLogin)

router.get('/validate-token', handleUserTokenValidation)

router.post('/signup', handleUserSignUp)


export default router
