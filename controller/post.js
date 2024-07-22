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
    mealType,
    veg,
  } = req.body
  try {
    console.log(req.body)
    const post = await Post.create({
      title,
      description,
      ingredients,
      steps,
      duration,
      imageUrl,
      tags,
      author: req.user._id,
      mealType,
      veg,
    })

    const user = await User.findById(req.user._id).select('-password -salt')
    user.posts.push(post._id)
    await user.save()

    return res.status(201).json({ status: 'success', user: user })
  } catch (error) {
    console.log(error.message)
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
    posts.sort((a, b) => b.createdAt - a.createdAt)
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

async function handleGetStarredPosts(req, res) {
  const userId = req.user._id
  try {
    const user = await User.findById(userId).populate({
      path: 'starredPosts',
      populate: {
        path: 'author',
        select: 'username',
      },
    })
    const starredPosts = user.starredPosts
    return res
      .status(200)
      .json({ status: 'success', starredPosts: starredPosts })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

async function handleGetUserPosts(req, res) {
  const userId = req.user._id
  try {
    const user = await User.findById(userId).populate({
      path: 'posts',
      populate: {
        path: 'author',
        select: 'username',
      },
    })
    console.log(user)
    const userPosts = user.posts
    return res.status(200).json({ status: 'success', userPosts: userPosts })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

async function handleDeletePost(req, res) {
  console.log('Delete Request')
  const { id } = req.params
  const userId = req.user._id

  try {
    await Post.deleteOne({ _id: id })
    const user = await User.findById(userId).select('-password -salt')
    user.posts.pop(id)
    await user.save()
    console.log('Post Deleted')
    return res.status(200).json({ status: 'success', user: user })
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
  handleGetStarredPosts,
  handleGetUserPosts,
  handleDeletePost,
}
