import { OrderCreatedEvent, Publishier, Subjects } from "@doriantickets/common";

export class OrderCreatedPublisher extends Publishier<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
