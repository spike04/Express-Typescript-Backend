import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import passport from 'passport'

import { MONGO_PATH, PORT } from './utils/variables'

class App {
  public app: express.Application

  //@ts-ignore
  constructor(controllers) {
    this.app = express()

    this.connectToTheDatabase()
    this.initializeMiddleware()
    this.initializeController(controllers)
  }

  private initializeMiddleware() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(morgan('dev'))
    this.app.use(cors())

    // Initialize passport
    this.app.use(passport.initialize())
    // passport Config
    import('./utils/passport').then(passportConfig =>
      passportConfig.default(passport)
    )
  }

  private connectToTheDatabase() {
    // @ts-ignore
    mongoose.Promise = global.Promise
    mongoose.connect(MONGO_PATH, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    let db: mongoose.Connection = mongoose.connection
    db.on('open', console.log.bind(console, 'MongoDB Running'))
    db.on('error', console.error.bind(console, 'Mongo Connection error'))
  }

  private initializeController(controllers: any[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router)
    })
  }

  public listen() {
    this.app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}`)
    })
  }
}

export default App
