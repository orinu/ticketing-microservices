import { CustomError } from "./custom-erorr";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connectiong to database";
  constructor() {
    super('Error connectiong to database');

    //  Extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
