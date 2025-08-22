export default function (req, res, next) {
  passport.authenticate('jwt', { session: false })(req, res, next)
}
