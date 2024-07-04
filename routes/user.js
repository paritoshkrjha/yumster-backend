import { Router } from 'express'
import {
  handleUserLogin,
  handleUserSignUp,
  handleUserTokenValidation,
  handleGetUserData,
} from '../controller/user.js'
import authenticateToken from '../middleware/authentication.js'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', handleUserLogin)

router.get('/validate-token', handleUserTokenValidation)

router.post('/signup', handleUserSignUp)

router.get('/get-user', authenticateToken, handleGetUserData)

export default router
