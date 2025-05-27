import mongoose from "mongoose"

mongoose.set('strictQuery', false)
export const connectDB = (url) => mongoose.connect(url) 