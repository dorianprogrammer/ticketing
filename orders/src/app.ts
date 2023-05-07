import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@doriantickets/common";

// Routes
import { indexOrderRequest } from "./routes";
import { showOrderRequest } from "./routes/show";
import { newOrderRequest } from "./routes/new";
import { deleteOrderRequest } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);
app.use(currentUser);

app.use(indexOrderRequest);
app.use(showOrderRequest);
app.use(newOrderRequest);
app.use(deleteOrderRequest);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
