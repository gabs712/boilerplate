import express from 'express'
import userController from '../controllers/userController.mjs'

const route = express.Router()

route.post('/', userController.create)

export default route
