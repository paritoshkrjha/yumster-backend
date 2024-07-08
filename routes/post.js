import express from 'express'
import { handleCreatePost, handleLikePost, handleStarPost } from '../controller/post.js'
import authenticateToken from '../middleware/authentication.js'

const router = express.Router()

router.get('/', (req, res) => {})

router.post('/',authenticateToken, handleCreatePost)

router.post('/:id/like',authenticateToken, handleLikePost)
router.post('/:id/star',authenticateToken, handleStarPost)

router.delete('/', (req, res) => {})

export default router
