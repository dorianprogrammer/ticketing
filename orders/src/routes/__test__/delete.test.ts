import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";
import request from "supertest";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";

it("marks an order as cancelled", async () => {
  // Create ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(204);

  // Make sure order is cancelled
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  // Create ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
