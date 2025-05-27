export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.message, 'Error Message')

  let customError = {
    statusCode: err.sCode || 500,
    message: err.message || 'Something went wrong, please try again'
  }

  // Handle ValidationError
  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map(item => item.message)
      .join(',')
    customError.statusCode = 400
  }

  // Handle Duplicate Key Error (E11000)
  if (err.code === 11000) {
    console.log('Duplicate key error')

    // Customize the error message to be more user-friendly
    const field = Object.keys(err.keyValue)[0] // Get the field that caused the conflict
    customError.message = `The ${field} is already in use. Please choose a different value.`
    customError.statusCode = 400
  }

  // Handle CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    customError.message = `No results for: ${err.value} (Cast Error)`
    customError.statusCode = 404
  }

  console.log(err.name)

  // Handle CastError (e.g., invalid ObjectId)
  if (err.name === 'CastError') {
    if (err.path === '_id') {
      customError.message = `Invalid ID format. Please check the ID and try again.`
      customError.statusCode = 400
    } else {
      customError.message = `Invalid data format for field: ${err.path}.`
      customError.statusCode = 400
    }
  }

  // Return the custom error message to the client
  return res
    .status(customError.statusCode)
    .json({ message: customError.message })
}
