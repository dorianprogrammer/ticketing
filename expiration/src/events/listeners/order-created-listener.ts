import { Listener, OrderCreatedEvent } from "@doriantickets/common";
import { Subjects } from "@doriantickets/common/build/events/subjects";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { expirationalQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting this many milliseconds to process the job");

    await expirationalQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
