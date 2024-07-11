import User from '../models/user.js'
import { generateUserToken, validateToken } from '../services/authentication.js'

async function handleUserTokenValidation(req, res) {
  const token = req.headers.authorization.split(' ')[1]
  try {
    console.log(token)
    const payload = validateToken(token)
    const user = await fetchUserData(payload._id)
    return res.status(200).json({ user: user })
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body
  try {
    const { token, user } = await User.matchUserPasswordandGenerateToken(
      email,
      password
    )
    return res.status(200).json({ status: 'success', token: token, user: user })
  } catch (error) {
    return res.status(401).json({ status: 'error', message: error.message })
  }
}

async function handleUserSignUp(req, res) {
  const { username, email, password, preferences } = req.body
  console.log(req.body)
  //checking if all required fields are provided
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Please provide all required fields' })
  }
  try {
    // Checking if user already exists
    const user = await User.findOne({ email: email })
    if (user) {
      console.log('here')
      return res
        .status(400)
        .json({ status: 'error', message: 'User already exists' })
    }

    //creating a new user
    const newUser = await User.create({
      username,
      email,
      password,
      preferences,
    })
    //creating jwt token for the user
    const token = generateUserToken(newUser)

    let newUserObj = newUser.toObject()
    delete newUserObj.password
    delete newUserObj.salt

    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      token: token,
      user: newUserObj,
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

async function fetchUserData(userId) {
  try {
    const user = await User.findById(userId).select('-password -salt')
    if (!user) return null
    return user
  } catch (error) {
    return null
  }
}

async function handleGetUserData(req, res) {
  const userId = req.user._id
  try {
    const user = await fetchUserData(userId)
    if (!user)
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' })
    return res.status(200).json({ status: 'success', user: user })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

export {
  handleUserLogin,
  handleUserSignUp,
  handleUserTokenValidation,
  handleGetUserData,
}
