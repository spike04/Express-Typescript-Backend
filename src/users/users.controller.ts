import express, { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { compare, hash, hashSync } from 'bcryptjs'
import User, { IUser } from './users.model'
import { validateLoginInput, validateRegisterInput } from './user.validator'
import { SECRET } from '../utils/variables'

class AuthController {
  public path = '/auth'
  public router: express.Router = Router()
  private user = User

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // this.router.get(this.path, this.getAllUsers)
    this.router.post(`${this.path}/register`, this.performRegister)
    this.router.post(`${this.path}/login`, this.performLogin)
    this.router.get(
      `${this.path}/me`,
      passport.authenticate('jwt', { session: false }),
      this.getMyInfo
    )
  }

  /**
   * @method  GET || Perform Login
   * @type    Public
   */
  private performLogin = async (request: Request, response: Response) => {
    const user: IUser = request.body

    let { errors, isValid } = validateLoginInput(user)
    if (!isValid) response.send(errors)

    const userResponse: any = await this.user.findOne({ email: user.email })
    if (!user) {
      errors.email = 'User Not Found'
      return response.status(400).json(errors)
    }
    // Check Password
    const isMatch = await compare(user.password, userResponse.password)
    if (isMatch) {
      // Create a JWT Token and send as response with Expiry Date
      const payload = {
        id: userResponse.id
      }
      jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
        response.json({
          success: true,
          token: `Bearer ${token}`
        })
      })
    } else {
      errors.password = 'Incorrect Password'
      response.send(errors)
    }
  }

  /**
   * @method  GET || Register
   * @type    Public
   */
  private performRegister = async (request: Request, response: Response) => {
    let { errors, isValid } = validateRegisterInput(request.body)
    if (!isValid) return response.send(errors)

    const userExist = await User.findOne({ email: request.body.email })
    if (userExist) {
      errors.email = 'Email already exists'
      return response.send(errors)
    }
    const { email, name, password } = request.body

    const hashedPassword = await hash(password, 10)

    const newUser = new User({
      email,
      name,
      password: hashedPassword
    })

    newUser
      .save()
      .then(user => response.json({ success: true }))
      .catch(_err =>
        response
          .status(400)
          .json({ couldnotregister: 'Couldnot Register User' })
      )
  }

  /**
   * @method  GET || Get Current User's Info
   * @type    Private
   */
  private getMyInfo = (request: Request, response: Response) => {
    response.send(request.user)
  }
}

export default AuthController
