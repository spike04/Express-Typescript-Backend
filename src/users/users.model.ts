import 'dotenv/config'
import { Schema, Document, model, Model } from 'mongoose'
import { hashSync } from 'bcryptjs'

export interface IUser extends Document {
  email: string
  name: string
  password: string
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    password: String
  },
  { versionKey: false }
)

UserSchema.pre<IUser>('save', async function(next) {
  if (this.isModified(this.password)) {
    this.password = await hashSync(this.password)
    return next()
  }
})

const User: Model<IUser, {}> = model('User', UserSchema)

export default User
