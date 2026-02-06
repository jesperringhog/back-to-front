import express, { json } from "express";
import cors from "cors";
import { thingRouter } from "./routes/thingRouter.mjs";

const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/everything", thingRouter);

app.listen(3000, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Api is running");
  }
});
