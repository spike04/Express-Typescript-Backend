import jwt from 'passport-jwt'
import { SECRET } from '../utils/variables'
import User from '../users/users.model'
const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

export default function(passport: any) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET
      },
      (jwt_payload, done) => {
        User.findById(jwt_payload.id)
          .then((user: any) => {
            // Removing Password Field
            user.password = undefined
            if (user) return done(null, user)
            return done(null, false, {
              status: 401,
              title: 'UnAthorized',
              message: 'Invalid user token'
            })
          })
          .catch(err => console.error(err))
      }
    )
  )
}
