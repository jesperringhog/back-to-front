import express, { json } from "express";
import cors from "cors";
import { someRouter } from "./routes/someRouter.mjs";

const app = express();

app.use(json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use("/somethings", someRouter);

app.listen(3000, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log("api is running");
    }
})