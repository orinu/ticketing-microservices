import { Listener, orderCreatedEvent, Subjects } from "@ontickets-on/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<orderCreatedEvent> {
  subject: Subjects.OrderCreeated = Subjects.OrderCreeated;
  queueGroupName = queueGroupName;

  async onMessage(data: orderCreatedEvent["data"], msg: Message) {
    // find ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not flound");
    }

    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();

    //  ack the message
    msg.ack();
  }
}
