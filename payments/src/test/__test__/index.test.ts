import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
    return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title:'asdads',
      price: 20
    });
}

it("can fetch a list of tickets", async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const respones = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200)

    expect(respones.body.length).toEqual(3)
});
