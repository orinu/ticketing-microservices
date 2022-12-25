import express, { Request, Response } from "express";
import { body } from "express-validator";
import { stripe } from "../stripe";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@ontickets-on/common";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    // get token and orderId
    const { token, orderId } = req.body;
    // find order
    const order = await Order.findById(orderId);
    // no order
    if (!order) {
      throw new NotFoundError();
    }
    // payment and order not share same user
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    // try to pay on cancelled order
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }

    await stripe.charges.create({
      currency: "usd",
      amount: order.price * 10,
      source: token,
    });

    res.send({ success: true });
  }
);

export { router as createChargeRouter };
