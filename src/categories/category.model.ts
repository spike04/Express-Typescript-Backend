import { Schema, Document, model, Model } from 'mongoose'

export interface ICategory extends Document {
  name: string
}

const categoryScheme = new Schema(
  {
    name: String
  },
  { versionKey: false }
)

const Category: Model<ICategory, {}> = model('Category', categoryScheme)

export default Category
