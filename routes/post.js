import express from 'express'
import {
  handleCreatePost,
  handleLikePost,
  handleStarPost,
  handleGetPosts,
  handleViewPost,
  handleGetStarredPosts,
  handleGetUserPosts,
  handleDeletePost
} from '../controller/post.js'
import authenticateToken from '../middleware/authentication.js'

const router = express.Router()

router.get('/', handleGetPosts)
router.post('/', authenticateToken, handleCreatePost)
router.delete('/:id/', authenticateToken, handleDeletePost)
router.get('/my-posts', authenticateToken, handleGetUserPosts)
router.get('/starred', authenticateToken, handleGetStarredPosts)
router.post('/:id/view', authenticateToken, handleViewPost)
router.post('/:id/like', authenticateToken, handleLikePost)
router.post('/:id/star', authenticateToken, handleStarPost)

export default router
