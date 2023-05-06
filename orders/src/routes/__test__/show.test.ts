import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import request from "supertest";

it("fetches the order", async () => {
  // Create ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const user = global.signin();

  // Build an order with a ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchOrder.id).toEqual(order.id);
});

it("returns an error if one user tries to fetch another users order", async () => {
  // Create ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const user = global.signin();

  // Build an order with a ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Fetch the order
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);

  //   expect(fetchOrder.id).toEqual(order.id);
});
