import { Subjects, Publisher, ExpirationCompleteEvent } from "@ontickets-on/common";

export class ExprationCompletePublisher extends Publisher <ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}