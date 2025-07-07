import { configDotenv } from 'dotenv'
import express from 'express'

configDotenv()

const app = express()

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
