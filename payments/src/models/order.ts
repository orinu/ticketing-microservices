import { OrderStatus } from "@ontickets-on/common";
import mongoose from "mongoose";
import { transform } from "typescript";

interface OrderAttrs {
  id: string;
  version: number;
  price: number;
  userId: string;
  status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
  version: number;
  price: number;
  userId: string;
  status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderAttrs> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
