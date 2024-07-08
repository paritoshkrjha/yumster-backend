import Post from '../models/post.js'

async function handleCreatePost(req, res) {
  const { title, description, ingredients, steps, duration, imageUrl, tags , author} = req.body
  try {
    const post = await Post.create({
      title,
      description,
      ingredients,
      steps,
      duration,
      imageUrl,
      tags,
      author
    })
    return res.status(201).json({ status: 'success', post: post })
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message })
  }
}

export { handleCreatePost }
