import * as express from 'express'
import Product from './products.interface'
import productModel from './products.model'

class CategoryController {
  public path = '/product'
  public router = express.Router()
  private product = productModel

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllProducts)
    this.router.get(`${this.path}/:id`, this.getProductById)
    this.router.put(`${this.path}/:id`, this.modifyProduct)
    this.router.delete(`${this.path}/:id`, this.deleteProduct)
    this.router.post(this.path, this.createAProduct)
  }

  private getAllProducts = (
    _request: express.Request,
    response: express.Response
  ) => {
    this.product.find().then(products => {
      response.send(products)
    })
  }

  private getProductById = (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id
    this.product.findById(id).then(product => {
      response.send(product)
    })
  }

  private modifyProduct = (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id
    const productData: Product = request.body
    this.product
      .findByIdAndUpdate(id, productData, { new: true })
      .then(product => {
        response.send(product)
      })
  }

  private createAProduct = (
    request: express.Request,
    response: express.Response
  ) => {
    const productData: Product = request.body
    const createProduct = new this.product(productData)
    createProduct.save().then(savedProduct => {
      response.send(savedProduct)
    })
  }

  private deleteProduct = (
    request: express.Request,
    response: express.Response
  ) => {
    const id = request.params.id
    this.product.findByIdAndDelete(id).then(successResponse => {
      if (successResponse) response.send(200)
      else response.send(404)
    })
  }
}

export default CategoryController
