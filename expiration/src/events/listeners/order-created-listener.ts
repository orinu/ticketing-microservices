import { Listener, orderCreatedEvent, Subjects } from "@ontickets-on/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<orderCreatedEvent> {
  subject: Subjects.OrderCreeated = Subjects.OrderCreeated;
  queueGroupName = queueGroupName;
  async onMessage(data: orderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );
    msg.ack();
  }
}
