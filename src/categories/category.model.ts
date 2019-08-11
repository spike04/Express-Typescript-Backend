import * as mongoose from 'mongoose'
import Category from './category.interface'

const categoryScheme = new mongoose.Schema({
  name: String
})

const categoryModel = mongoose.model<Category & mongoose.Document>(
  'Category',
  categoryScheme
)

export default categoryModel
