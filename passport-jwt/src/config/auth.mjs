import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import prisma from '../utils/prisma.mjs'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    let user
    try {
      user = await prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      })
    } catch (err) {
      return done(err)
    }

    if (!user) {
      return done(null, false)
    }

    done(null, user)
  }),
)
