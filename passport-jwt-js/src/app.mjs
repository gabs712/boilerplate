import { configDotenv } from 'dotenv'
import express from 'express'
import passport from 'passport'
import authRouter from './routes/authRouter.mjs'
import userRouter from './routes/userRouter.mjs'

configDotenv()

const app = express()

app.use(express.json())
app.use(passport.initialize())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
