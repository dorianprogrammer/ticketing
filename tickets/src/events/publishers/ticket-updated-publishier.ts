import { Publishier, Subjects, TicketUpdatedEvent } from "@doriantickets/common";

export class TicketUpdatedPublishier extends Publishier<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
