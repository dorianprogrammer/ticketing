import { Publishier, Subjects, TicketCreatedEvent } from "@doriantickets/common";

export class TicketCreatedPublishier extends Publishier<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
