import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  // check if JWT_KEY defined
  if (!process.env.JWT_KEY) {
    throw new Error("process.env.JWT_KEY not found");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("process.env.MONGO_URI not found");
  }

  // connect to db
  try {
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
