import express from 'express'
import {
  handleCreatePost,
  handleLikePost,
  handleStarPost,
  handleGetPosts,
  handleViewPost,
} from '../controller/post.js'
import authenticateToken from '../middleware/authentication.js'

const router = express.Router()

router.get('/', handleGetPosts)

router.post('/', authenticateToken, handleCreatePost)
router.post('/:id/view', authenticateToken, handleViewPost)
router.post('/:id/like', authenticateToken, handleLikePost)
router.post('/:id/star', authenticateToken, handleStarPost)

router.delete('/', (req, res) => {})

export default router
