import App from './app'

import validateEnv from './utils/validateEnv'

import CategoryController from './categories/categories.controller'
import ProductController from './products/products.controller'
import AuthController from './users/users.controller'

validateEnv()

const app = new App([
  new CategoryController(),
  new ProductController(),
  new AuthController()
])

app.listen()
