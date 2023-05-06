import { OrderCancelledEvent, Publishier, Subjects } from "@doriantickets/common";

export class OrderCancelledPublisher extends Publishier<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
