import express, { urlencoded } from 'express'
import mongoose from 'mongoose'

import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'

const app = express()
const PORT = 8000

mongoose
  .connect('mongodb://localhost:27017/yumster-backend')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())

app.use('/user/', userRoutes)

app.use('/post/', postRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
