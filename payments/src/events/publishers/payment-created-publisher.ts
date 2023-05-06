import { PaymentCreatedEvent, Publishier, Subjects } from "@doriantickets/common";

export class PaymentCreatedPublishier extends Publishier<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
