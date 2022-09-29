import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // create ticket & save
  const ticket = Ticket.build({
    title: "concert",
    price: 8,
    userId: "123",
  });
  await ticket.save();

  //  fetch twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //   change values
  firstInstance!.set({ price: 15 });
  secondInstance!.set({ price: 15 });

  //   save first Instance
  await firstInstance!.save();
  try {
    //   save second Instance
    await expect(secondInstance!.save()).rejects.toThrow();
  } catch (err) {
    return;
  }
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 8,
    userId: "123",
  });
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
