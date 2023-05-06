import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // create instans of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });

  // save ticket into the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make two separate changs to he tickets we fetched
  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });

  // save the first fetched ticket
  await firstInstance?.save();

  // save the second fetched ticket and expect error
  try {
    await secondInstance?.save();
  } catch (error) {
    return;
  }
});

it("increments the version number on multiple saves", async () => {
  // create instans of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();

  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
