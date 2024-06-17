import { Router } from 'express'
import { handleUserLogin, handleUserSignUp, handleUserTokenValidation } from '../controller/user.js'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/login', handleUserLogin)

router.get('/validate-token', handleUserTokenValidation)

router.post('/signup', handleUserSignUp)

export default router
