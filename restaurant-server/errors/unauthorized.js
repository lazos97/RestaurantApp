import { CustomAPIError } from './custom-error.js'

export class Unauthorized extends CustomAPIError {
  sCode
  constructor(message) {
    super(message)
    this.sCode = 401
  }
}
