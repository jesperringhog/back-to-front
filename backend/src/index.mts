import express, { json } from "express";
import cors from "cors";
import { thingRouter } from "./routes/thingRouter.mjs";
import mongoose from "mongoose";

const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/everything", thingRouter);

app.listen(3000, async (error) => {
  try {
    if (error) {
      console.error(error);
    } else {

      console.log("Api is running");
    }
  } catch (error) {
    console.error(error);
  }
});
