import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";
import { STRIPE_KEY } from "./env";

declare global {
  var signin: (id?: string) => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

jest.mock("../nats-wrapper.ts");
process.env.STRIPE_KEY = STRIPE_KEY;

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = (id?: string) => {
  // build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // build session object {jwt: My_JWT}
  const session = { jwt: token };

  // turn into json
  const sessionJSON = JSON.stringify(session);

  // encode base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return cookie
  return [`session=${base64}`];
};
