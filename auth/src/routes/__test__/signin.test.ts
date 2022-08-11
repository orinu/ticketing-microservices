import request from "supertest";
import { app } from "../../app";

it('fails if email not exist', async () => {
    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400)
})

it('fails if incorrect password', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'dsasdasda'
    })
    .expect(400)
})

it('responds with a cookie when given valid credentails', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    const res = await request(app)
    .post('/api/users/signin')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(200)

    expect(res.get('Set-Cookie')).toBeDefined();
})