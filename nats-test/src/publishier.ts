import nats from "node-nats-streaming";
import { TicketCreatedPublishier } from "./events/ticket-created-publishier";
console.clear();

const client = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

client.on("connect", async () => {
  console.log("Publishier connected to nats");

  const publishier = new TicketCreatedPublishier(client);
  try {
    await publishier.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (error) {
    console.error(error);
  }

  // const data = JSON.stringify({
  //   id: "123",
  //   title: "concert",
  //   price: 20,
  // });

  // client.publish("ticket:created", data, () => {
  //   console.log("Event published");
  // });
});
