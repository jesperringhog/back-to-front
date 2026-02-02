import express from "express";
import type { SomeThing } from "../models/SomeThing.mjs";
import { someThings } from "../data/someThings.mjs";

export const someThingsRouter = express.Router();

someThingsRouter.get("/", (_, res) => {
    res.status(200).json(someThings);
})

someThingsRouter.post("/", (req, res) => {
  try {
    const { createThing } = req.body;

    const newThing: SomeThing = { id: Date.now(), name: createThing };

    if (createThing) {
      someThings.push(newThing);
      res.status(201).json(newThing);
    } else {
      res.status(400).json({ message: newThing + "is a invalid thing" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});
