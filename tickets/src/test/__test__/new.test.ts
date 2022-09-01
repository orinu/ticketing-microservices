import request from "supertest";
import { app } from "../../app";
import { Ticket } from '../../models/ticket'

it("has a route handler listening to /api/tickets for post request", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).not.toEqual(404);
});

it("can only be accesse if the user is signed in", async () => {
  const res = await request(app).post("/api/tickets").send({});
  expect(res.status).toEqual(401);
});

it("return status other then 401 if user is signed in ", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({});
  expect(res).not.toEqual(401);
});

it("return an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      price: 10,
    })
    .expect(400);
});
it("return an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "dfsffsd",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "dfsffsd",
    })
    .expect(400);
});
it("create a ticket with valid inputs ", async () => {
    let ticket = await Ticket.find({});
    expect(ticket.length).toEqual(0)

    await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "dfsffsd",
      price: 20
    })
    .expect(201);

    ticket = await Ticket.find({});
    expect(ticket.length).toEqual(1)
    expect(ticket[0].price).toEqual(20)
});
