import { CustomError } from "./custom-erorr";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');

    //  Extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }


  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
