import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { createTicketsRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

import { errorHandler, NotFoundError , currentUser   } from  "@ontickets-on/common";


const app = express();
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser)

app.use(createTicketsRouter)
app.use(showTicketRouter)


app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };