import { CustomAPIError } from './custom-error.js'

export class BadRequest extends CustomAPIError {
  sCode
  constructor(message) {
    super(message)
    this.sCode = 400
  }
}
