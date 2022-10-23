import { Listener, orderCreatedEvent, Subjects } from "@ontickets-on/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<orderCreatedEvent> {
  subject: Subjects.OrderCreeated = Subjects.OrderCreeated;
  queueGroupName = queueGroupName;

  async onMessage(data: orderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}
