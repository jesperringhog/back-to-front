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
import type { Thing } from "../models/Thing.mjs";

export const thingRouter = express.Router();

thingRouter.post("/", async (req, res) => {
  try {
    const { someThing }: { someThing: string } = req.body;

    if (someThing && someThing !== "") {
      const newThing = await createThing(someThing);

      res.status(201).json(newThing);
    } else {
      res.status(400).json({
        message: "body does not contain someThing, or has nothing as value for bodyPart",
      } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "server is posting an error",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

thingRouter.get("/", async (req, res) => {
  try {
    const { filter, sort } = req.query;

    const things = await getThings(filter, sort);

    res.status(200).json(things);
  } catch (error) {
    res.status(500).json({ message: "server won't show anything" });
  }
});

thingRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const found = await getThing(id);

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

thingRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { someThing }: { someThing: Thing } = req.body;

    if (+id !== someThing.id) {
      res.status(400).json({
        message: "id does not match with this thing",
      } satisfies ApiResponse);
    } else {
      const found = await updateThing(someThing);

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

thingRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const success = await removeThing(id);

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
