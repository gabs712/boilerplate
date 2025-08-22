import prisma from '../utils/prisma.mjs'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
  login: async (req, res) => {
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

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' })
    }

    const isValidPassword = await bcryptjs.compare(password, user.passwordHash)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    })

    res.json({ token })
  },
}
