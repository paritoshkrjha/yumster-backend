import User from '../models/user.js'
import { generateUserToken, validateToken } from '../services/authentication.js'

async function handleUserTokenValidation(req, res) {
  const token = req.headers.authorization.split(' ')[1]
  try {
    console.log(token)
    const user = validateToken(token)
    return res.status(200).json({ user: user })
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body
  try {
    const token = await User.matchUserPasswordandGenerateToken(email, password)
    return res.status(200).json({ status: 'success', token: token })
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

    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      token: token,
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

async function handleGetUserData(req, res) {
  const userId = req.body.userId
  try {
    const user = await User.findById(userId)
    return res.status(200).json({ status: 'success', user: user })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

export { handleUserLogin, handleUserSignUp, handleUserTokenValidation,handleGetUserData }
