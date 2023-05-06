import { ExpirationCompleteEvent, Publishier, Subjects } from "@doriantickets/common";

export class ExpirationCompletePublishier extends Publishier<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  
}
