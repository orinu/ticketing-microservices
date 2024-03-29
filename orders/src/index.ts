import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";

import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdateListener } from "./events/listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";

import { app } from "./app";

const start = async () => {
  console.log("Starting....")
  // check if env defined
  if (!process.env.JWT_KEY) {
    throw new Error("process.env.JWT_KEY not found");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("process.env.MONGO_URI not found");
  }

  // check if NATS vars defiend
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("process.env.NATS_CLIENT_ID not found");
  }
  if (!process.env.NATS_URL) {
    throw new Error("process.env.NATS_URL not found");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("process.env.NATS_CLUSTER_ID not found");
  }

  // connect to db & NATS
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connction close");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdateListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000 ");
  });
};

start();
