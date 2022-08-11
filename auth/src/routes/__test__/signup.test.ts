import request from "supertest";
import { app } from "../../app";

it('returns a 201 on successful signup', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)
})

it('returns a 400 with inalid email', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test',
        password: 'password'
    })
    .expect(400)
})

it('returns a 400 with inalid password', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'dd'
    })
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'dd'
    })
    .expect(400)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@te',
        password: 'password'
    })
    .expect(400)
})

it('disallows duplicate email', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(400)
})

it('sets a cookie agter succesful signup', async () => {
    const res = await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    expect(res.get('Set-Cookie')).toBeDefined();
})