import express from "express";
import type { ApiErrorResponse } from "../models/ApiErrorResponse.mjs";
import {
  createThing,
  getThing,
  getThings,
  removeThing,
  updateThing,
} from "../controllers/thingController.mjs";
import type { ApiResponse } from "../models/ApiResponse.mjs";
import type { SomeThing } from "../models/SomeThing.mjs";

export const thingRouter = express.Router();

thingRouter.post("/", (req, res) => {
  try {
    const { bodyPart }: { bodyPart: string } = req.body;

    if (bodyPart && bodyPart !== "") {
      const newThing = createThing(bodyPart);

      res.status(201).json(newThing);
    } else {
      res.status(400).json({
        message: "body does not contain bodyPart, or has nothing as value for bodyPart",
      } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "server is posting an error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

thingRouter.get("/", (req, res) => {
  try {
    const { filter, sort } = req.query;

    const things = getThings(filter, sort);

    res.status(200).json(things);
  } catch (error) {
    res.status(500).json({ message: "server won't show anything" });
  }
});

thingRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const found = getThing(id);

    if (found) {
      res.status(200).json(found);
    } else {
      res.status(400).json({ message: "nothing to be found with id " + id });
    }
  } catch (error) {
    res.status(500).json({
      message: "server doesn't find anything",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

thingRouter.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { someThing }: { someThing: SomeThing } = req.body;

    if (+id !== someThing.id) {
      res.status(400).json({
        message: "id does not match with this thing",
      } satisfies ApiResponse);
    } else {
      const found = updateThing(someThing);

      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({ message: "nothing to be found" });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "server needs updating...",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

thingRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const success = removeThing(id);

    if (success) {
      res.status(204).json();
    } else {
      res
        .status(400)
        .json({ message: "nothing to delete" } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "server doesn't like removing things",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});
