import { natsWrapper } from "./nats-wrapper";

const start = async () => {
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
  } catch (err) {
    console.error(err);
  }
};

start();
