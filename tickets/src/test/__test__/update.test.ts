import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = "concert";
  const price = 20;

  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(404);
});
it("return 401 if the user not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const title = "concert";
  const price = 20;

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title,
      price,
    })
    .expect(401);
});
it("return 401 if the user does not own the ticket", async () => {
  const title = "concert";
  const price = 20;

  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "fsdfsfs",
      price: 50,
    })
    .expect(401);
});
it("return 400 if the user privides an invalid title or price", async () => {
  const title = "concert";
  const price = 20;
  const cookie = global.signin();

  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 50,
    })
    .expect(400);
});
it("updates the ticket if provided inputs", async () => {
  const title = "concert";
  const price = 20;
  const cookie = global.signin();

  const res = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title,
      price,
    });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "changed title",
      price: 50,
    })
    .expect(200);

  const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send();

  expect(ticketRes.body.title).toEqual("changed title");
  expect(ticketRes.body.price).toEqual(50);
});
