import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import Product, { IProduct } from './products.model'
import NotFoundException from '../exceptions/NotFoundException'
import IdNotFoundException from '../exceptions/IdNotFoundException'
import validationMiddleware from '../middlewares/validation.middleware'
import CreateProductDto from './product.dto'

class CategoryController {
  public path = '/product'
  public router: Router = Router()
  private product = Product

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(
      this.path,
      passport.authenticate('jwt', { session: false }),
      this.getAllProducts
    )
    this.router.get(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      this.getProductById
    )
    this.router.put(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      validationMiddleware(CreateProductDto, true),
      this.modifyProduct
    )
    this.router.delete(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      this.deleteProduct
    )
    this.router.post(
      this.path,
      passport.authenticate('jwt', { session: false }),
      validationMiddleware(CreateProductDto),
      this.createAProduct
    )
  }

  private getAllProducts = (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    this.product.find().then(products => {
      if (products) response.send(products)
      else next(new NotFoundException('No Products Found'))
    })
  }

  private getProductById = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    this.product.findById(id).then(product => {
      if (product) response.send(product)
      else next(new IdNotFoundException(id))
    })
  }

  private modifyProduct = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    const productData: IProduct = request.body
    this.product
      .findByIdAndUpdate(id, productData, { new: true })
      .then(product => {
        if (product) response.send(product)
        else next(new IdNotFoundException(id))
      })
  }

  private createAProduct = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const productData: IProduct = request.body
    const createProduct = new this.product(productData)
    createProduct.save().then(savedProduct => {
      response.send(savedProduct)
    })
  }

  private deleteProduct = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    this.product.findByIdAndDelete(id).then(successResponse => {
      if (successResponse) response.sendStatus(200)
      else next(new IdNotFoundException(id))
    })
  }
}

export default CategoryController
