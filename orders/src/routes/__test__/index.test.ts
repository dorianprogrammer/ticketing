import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import request from "supertest";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 10,
    id: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();

  return ticket;
};

it("fetches orders for a particular user", async () => {
  // Create tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  // Create users
  const userOne = global.signin();
  const userTwo = global.signin();

  // Request a ticket #1 as User #1
  await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Request a ticket #2 as User #2
  const { body: ticketTwoForUserTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  // Request a ticket #3 as User #2
  const { body: ticketThreeForUserTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  // Get Tickets for User #2
  const { body: ticketsForUserTwo } = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  // Got tickets for User #2
  expect(ticketsForUserTwo.length).toEqual(2);
  expect(ticketsForUserTwo[0].id).toEqual(ticketTwoForUserTwo.id);
  expect(ticketsForUserTwo[1].id).toEqual(ticketThreeForUserTwo.id);
  expect(ticketsForUserTwo[0].ticket.id).toEqual(ticketTwo.id);
  expect(ticketsForUserTwo[1].ticket.id).toEqual(ticketThree.id);
});
