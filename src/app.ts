import 'dotenv/config'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as morgan from 'morgan'
const { MONGO_PATH, PORT } = process.env

class App {
  public app: express.Application
  public port: number

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
  }

  private connectToTheDatabase() {
    // @ts-ignore
    mongoose.Promise = global.Promise
    mongoose.connect(MONGO_PATH, { useNewUrlParser: true })
    let db: mongoose.Connection = mongoose.connection
    db.on('open', console.log.bind(console, 'MongoDB Running'))
    db.on('error', console.error.bind(console, 'Mongo Connection error'))
  }

  private initializeController(controllers) {
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
