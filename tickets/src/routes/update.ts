import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  NotFoundError,
} from "@ontickets-on/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body('title')
    .not()
    .isEmpty()
    .withMessage('title is required'),
    body('price')
    .isFloat({gt: 0})
    .withMessage('Price must be greater then 0')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    // ticket not found
    if (!ticket) {
        throw new NotFoundError();
    }
    // not the owner of the ticket
    if (ticket.userId !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    })

    await ticket.save()


    res.send(ticket);
  }
);

export { router as updateTicketRouter };
