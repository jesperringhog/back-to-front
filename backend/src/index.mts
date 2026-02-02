import express, { json } from "express";
import { someThingsRouter } from "./routes/someThingsRouter.mjs";

const app = express();
app.use(json());

app.use("/somethings", someThingsRouter);

app.listen(3000, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log("api is running");
    }
})