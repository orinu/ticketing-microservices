import { orderCreatedEvent, Publisher, Subjects } from "@ontickets-on/common";

export class OrderCreatedPublisher extends Publisher<orderCreatedEvent> {
  subject: Subjects.OrderCreeated = Subjects.OrderCreeated;
}
