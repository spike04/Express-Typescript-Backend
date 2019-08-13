import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import categoryModel, { ICategory } from './category.model'
import NotFoundException from '../exceptions/NotFoundException'
import IdNotFoundException from '../exceptions/IdNotFoundException'
import validationMiddleware from '../middlewares/validation.middleware'
import CreateCategoryDto from './category.dto'

class CategoryController {
  public path = '/category'
  public router: Router = Router()
  private category = categoryModel

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(
      this.path,
      passport.authenticate('jwt', { session: false }),
      this.getAllCategories
    )
    this.router.get(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      this.getCategoryById
    )
    this.router.put(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      validationMiddleware(CreateCategoryDto, true),
      this.modifyPost
    )
    this.router.delete(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      this.deletePost
    )
    this.router.post(
      this.path,
      passport.authenticate('jwt', { session: false }),
      validationMiddleware(CreateCategoryDto),
      this.createACategory
    )
  }

  private getAllCategories = (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    this.category.find().then(categories => {
      if (categories) response.send(categories)
      else next(new NotFoundException('No Categories found'))
    })
  }

  private getCategoryById = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    this.category.findById(id).then(category => {
      if (category) response.send(category)
      else next(new IdNotFoundException(id))
    })
  }

  private modifyPost = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    const categoryData: ICategory = request.body
    this.category
      .findByIdAndUpdate(id, categoryData, { new: true })
      .then(category => {
        if (category) response.send(category)
        else next(new IdNotFoundException(id))
      })
  }

  private createACategory = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const categoryData: ICategory = request.body
    const createCategory = new this.category(categoryData)
    createCategory.save().then(savedCategory => {
      response.send(savedCategory)
    })
  }

  private deletePost = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const id = request.params.id
    this.category.findByIdAndDelete(id).then(successResponse => {
      if (successResponse) response.sendStatus(200)
      else next(new IdNotFoundException(id))
    })
  }
}

export default CategoryController
