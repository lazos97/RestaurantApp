import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name.']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Provide email.'],
      validate: [validator.isEmail, 'Please provide a valid e-mail!']
    },
    password: {
      type: String,
      required: [true, 'Provide password.']
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
