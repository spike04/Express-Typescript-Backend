import * as mongoose from 'mongoose'
import Product from './products.interface'

const productScheme = new mongoose.Schema({
  name: String,
  price: {
    type: Number,
    default: 0
  }
})

const productModel = mongoose.model<Product & mongoose.Document>(
  'Product',
  productScheme
)

export default productModel
