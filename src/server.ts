import App from './app'

import validateEnv from './utils/validateEnv'

import CategoryController from './categories/categories.controller'
import ProductController from './products/products.controller'

validateEnv()

const app = new App([new CategoryController(), new ProductController()])

app.listen()
