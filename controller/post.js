import Post from '../models/post.js'
import User from '../models/user.js'

async function handleCreatePost(req, res) {
  const {
    title,
    description,
    ingredients,
    steps,
    duration,
    imageUrl,
    tags,
    author,
    mealType,
    veg,
  } = req.body
  try {
    const post = await Post.create({
      title,
      description,
      ingredients,
      steps,
      duration,
      imageUrl,
      tags,
      author,
      mealType,
      veg,
    })
    return res.status(201).json({ status: 'success', post: post })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

async function handleLikePost(req, res) {
  const { id } = req.params
  const userId = req.user._id
  try {
    const post = await Post.findById(id).populate('author', 'username')
    if (!post) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Post not found' })
    }
    if (post.likes.includes(userId)) {
      console.log('Already liked')
      post.likes.pop(userId)
    } else {
      console.log('Not liked')
      post.likes.push(userId)
    }
    await post.save()
    return res.status(200).json({ status: 'success', post: post })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

async function handleStarPost(req, res) {
  const { id } = req.params
  const userId = req.user._id
  try {
    const user = await User.findById(userId).select('-password -salt')
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' })
    }
    const isSaved = user.starredPosts.includes(id)
    if (isSaved) {
      console.log('Already starred')
      user.starredPosts.pop(id)
    } else {
      console.log('Not starred')
      user.starredPosts.push(id)
    }
    await user.save()
    return res.status(200).json({ status: 'success', user: user })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

async function handleGetPosts(req, res) {
  try {
    const posts = await Post.find().populate('author', 'username')
    console.log(posts)
    return res.status(200).json({ status: 'success', posts: posts })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

async function handleViewPost(req, res) {
  const { id } = req.params
  try {
    const post = await Post.findById(id).populate('author', 'username')
    post.views += 1
    await post.save()
    return res.status(200).json({ status: 'success', post: post })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

export {
  handleCreatePost,
  handleLikePost,
  handleStarPost,
  handleGetPosts,
  handleViewPost,
}
