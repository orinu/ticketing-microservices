import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "@ontickets-on/common";
import { Password } from "../services/password";
import { User } from "../models/user";
import { BadRequestError } from  "@ontickets-on/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must supply password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // try to query user
    const existingUser = await User.findOne({ email });

    // user not exist
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    // check if password true
    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch ) {
        throw new BadRequestError("Invalid credentials");
    }
    
    // Generate JWT
    const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        process.env.JWT_KEY!
      );
  
      // Store it on session coockie
      req.session = {
        jwt: userJwt,
      };
      

      res.status(200).send(existingUser);
  }
);

export { router as sighinRouter };
