import { CustomAPIError } from './custom-error.js'

export class NotFound extends CustomAPIError {
  sCode
  constructor(message) {
    super(message)
    this.sCode = 404
  }
}
