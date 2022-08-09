import express, { Request, Response } from "express";
import { User } from "../models/user";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requiest-validation-error";
import { BadRequestError } from "../errors/bad-requiest-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    // error handler
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    // Check if email in used
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    // Create user
    const user = User.build({
      email,
      password,
    });

    await user.save();
    res.status(201).send(user);
  }
);

export { router as signupRouter };
