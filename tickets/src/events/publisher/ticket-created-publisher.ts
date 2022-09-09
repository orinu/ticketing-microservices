import { Publisher, Subjects, TicketCreatedEvent } from "@ontickets-on/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
