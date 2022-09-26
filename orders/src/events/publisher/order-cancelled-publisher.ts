import { orderCancelledEvent, Publisher, Subjects } from "@ontickets-on/common";

export class orderCancelledPublisher extends Publisher<orderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
