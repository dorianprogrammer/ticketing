import Queue from "bull";
import { ExpirationCompletePublishier } from "../events/publishier/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {
  orderId: string;
}

const expirationalQueue = new Queue<Payload>("order:expirational", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationalQueue.process(async (job) => {
  new ExpirationCompletePublishier(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationalQueue };
