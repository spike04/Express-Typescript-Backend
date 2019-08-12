import { Document, model, Model, Schema } from 'mongoose'

export interface IProduct extends Document {
  name: string
  price: number
}

const productScheme = new Schema(
  {
    name: String,
    price: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false }
)

const Product: Model<IProduct, {}> = model('Product', productScheme)

export default Product
