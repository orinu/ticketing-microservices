import { Subjects, Publisher, PaymentCreatedEvent } from "@ontickets-on/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
