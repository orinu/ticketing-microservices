import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-erorr";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  
  console.log(err);
  res.status(400).send({
    errors: [{ message: "Somting went wrong" }],
  });
};
