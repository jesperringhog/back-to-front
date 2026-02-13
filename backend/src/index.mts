import express, { json } from "express";
import cors from "cors";
import { thingRouter } from "./routes/thingRouter.mjs";
import mongoose from "mongoose";
import { config } from "dotenv";
import { userRouter } from "./routes/userRouter.mjs";

config();

const mongoUri = process.env.MONGO_URI || "";
const port = process.env.PORT || 4000;

if (mongoUri === "") {
  throw "MONGO_URI does not exist in .env";
} 

const app = express();

app.use(json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/everything", thingRouter);

app.use("/user", userRouter);

app.listen(port, async (error) => {
  try {
    if (error) {
      console.error(error);
    } else {

      await mongoose.connect(mongoUri);

      console.log(`Api is running on port: ${port}, connected to the database`);
    }
  } catch (error) {
    console.error(error);
  }
});
