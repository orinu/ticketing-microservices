import { CustomError } from "./custom-erorr";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found');

    //  Extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }


  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}
