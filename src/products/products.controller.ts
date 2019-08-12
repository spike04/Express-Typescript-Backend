import express, { Router, Request, Response } from 'express'
import Product, { IProduct } from './products.model'

class CategoryController {
  public path = '/product'
  public router: Router = Router()
  private product = Product

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

  private getAllProducts = (_request: Request, response: Response) => {
    this.product.find().then(products => {
      response.send(products)
    })
  }

  private getProductById = (request: Request, response: Response) => {
    const id = request.params.id
    this.product.findById(id).then(product => {
      response.send(product)
    })
  }

  private modifyProduct = (request: Request, response: Response) => {
    const id = request.params.id
    const productData: IProduct = request.body
    this.product
      .findByIdAndUpdate(id, productData, { new: true })
      .then(product => {
        response.send(product)
      })
  }

  private createAProduct = (request: Request, response: Response) => {
    const productData: IProduct = request.body
    const createProduct = new this.product(productData)
    createProduct.save().then(savedProduct => {
      response.send(savedProduct)
    })
  }

  private deleteProduct = (request: Request, response: Response) => {
    const id = request.params.id
    this.product.findByIdAndDelete(id).then(successResponse => {
      if (successResponse) response.send(200)
      else response.send(404)
    })
  }
}

export default CategoryController
