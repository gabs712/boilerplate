import express from 'express'
import authController from '../controllers/authController.mjs'

const route = express.Router()

route.post('/', authController.login)

export default route
