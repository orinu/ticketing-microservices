import { Publisher, Subjects, TicketUpdatedEvent } from "@ontickets-on/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
