import { Schema, model } from 'mongoose'
import { randomBytes, createHmac } from 'crypto'
import { generateUserToken } from '../services/authentication.js'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String],
      default: [],
    },
    avatarUrl: {
      type: String,
      default: './images/default-user.png',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return

  const salt = randomBytes(16).toString()
  const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex')

  this.salt = salt
  this.password = hashedPassword

  next()
})

userSchema.static(
  'matchUserPasswordandGenerteToken',
  async function (email, password) {
    const user = await this.findOne({ email: email })

    if (!user) throw new Error('User not found')

    const salt = user.salt
    const hashedPassword = user.password
    const userProvidedHash = createHmac('sha256', salt)
      .update(password)
      .digest('hex')

    if (hashedPassword !== userProvidedHash)
      throw new Error('Password does not match')

    const token = generateUserToken(user)
    return token
  }
)

const User = model('User', userSchema)

export default User
