import prisma from '../utils/prisma.mjs'
import bcryptjs from 'bcryptjs'

export default {
  create: async (req, res) => {
    const { username, password } = req.body

    let user
    try {
      user = await prisma.user.findUnique({
        where: {
          username,
        },
      })
    } catch (err) {
      next(err)
    }

    if (user) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const passwordHash = await bcryptjs.hash(password, 10)
    await prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    })

    res.status(201).json({ message: `User "${username}" created` })
  },
}
