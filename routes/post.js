import express from 'express'
import { handleCreatePost } from '../controller/post.js'
import authenticateToken from '../middleware/authentication.js'

const router = express.Router()

router.get('/', (req, res) => {})

router.post('/',authenticateToken, handleCreatePost)

router.delete('/', (req, res) => {})

export default router
