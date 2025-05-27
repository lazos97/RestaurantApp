import { CustomAPIError } from './custom-error.js'

export class Internal extends CustomAPIError {
  sCode
  constructor(message) {
    super(message)
    this.sCode = 500
  }
}
