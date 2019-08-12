import express, { Router, Request, Response } from 'express'
import categoryModel, { ICategory } from './category.model'

class CategoryController {
  public path = '/category'
  public router: express.Router = Router()
  private category = categoryModel

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllCategories)
    this.router.get(`${this.path}/:id`, this.getCategoryById)
    this.router.put(`${this.path}/:id`, this.modifyPost)
    this.router.delete(`${this.path}/:id`, this.deletePost)
    this.router.post(this.path, this.createACategory)
  }

  private getAllCategories = (_request: Request, response: Response) => {
    this.category.find().then(categories => {
      response.send(categories)
    })
  }

  private getCategoryById = (request: Request, response: Response) => {
    const id = request.params.id
    this.category.findById(id).then(category => {
      response.send(category)
    })
  }

  private modifyPost = (request: Request, response: Response) => {
    const id = request.params.id
    const categoryData: ICategory = request.body
    this.category
      .findByIdAndUpdate(id, categoryData, { new: true })
      .then(category => {
        response.send(category)
      })
  }

  private createACategory = (request: Request, response: Response) => {
    const categoryData: ICategory = request.body
    const createCategory = new this.category(categoryData)
    createCategory.save().then(savedCategory => {
      response.send(savedCategory)
    })
  }

  private deletePost = (request: Request, response: Response) => {
    const id = request.params.id
    this.category.findByIdAndDelete(id).then(successResponse => {
      if (successResponse) response.send(200)
      else response.send(404)
    })
  }
}

export default CategoryController
