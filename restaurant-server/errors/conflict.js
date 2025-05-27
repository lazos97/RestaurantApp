import { CustomAPIError } from './custom-error.js'

export class Forbidden extends CustomAPIError {
  sCode
  constructor(message) {
    super(message)
    this.sCode = 409
  }
}
