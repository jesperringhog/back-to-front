import express from "express";
import { someThings } from "../data/someThings.mjs";
import type { SomeThing } from "../models/SomeThing.mjs";
import type { ApiErrorResponse } from "../models/ApiErrorResponse.mjs";
import type { ApiResponse } from "../models/ApiResponse.mjs";

export const someRouter = express.Router();

someRouter.post("/", (req, res) => {
  try {
    const { someName } = req.body;

    if (someName) {
      const newThing: SomeThing = { id: Date.now(), name: someName };

      someThings.push(newThing);

      res.status(201).json(someThings);
    } else {
      res.status(400).json({
        message: "nothing to create without some name",
      } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "server is posting errors",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

someRouter.get("/", (req, res) => {
  try {
    const { filter, sort } = req.query;

    let filteredThings = someThings;

    if (filter) {
      filteredThings = someThings.filter((thing) =>
        thing.name.toLowerCase().includes(filter.toString()),
      );
    }

    if (sort) {
      const direction = sort === "asc" ? 1 : -1;
      filteredThings.sort((a, b) => (a.id - b.id) * direction);
    }

    res.status(203).json(filteredThings);
  } catch (error) {
    res.status(500).json({
      message: "server don't like to get errors",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

someRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const foundThing = someThings.find((thing) => thing.id === +id);

    if (foundThing) {
      res.status(200).json(foundThing);
    } else {
      res.status(404).json({
        message: "nothing to show with id " + id,
      } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "server is reading in the the error library",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

someRouter.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { someThing }: { someThing: SomeThing } = req.body;

    if (+id !== someThing.id) {
      res.status(400).json({
        message: "this id doesn't match with anything",
      } satisfies ApiResponse);
    } else {
      const foundThing = someThings.find((thing) => thing.id === +someThing.id);

      if (foundThing) {
        foundThing.name = someThing.name;
        res.status(200).json(foundThing);
      } else {
        res
          .status(404)
          .json({ message: "nothing to be found" } satisfies ApiResponse);
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "server can only patch errors today",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});

someRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const someIndex = someThings.findIndex((thing) => thing.id === +id);

    if (someIndex >= 0) {
      someThings.splice(someIndex, 1);
      res.status(204).json();
    } else {
      res
        .status(400)
        .json({
          message: "nothing to delete with id " + id,
        } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "server can't delete this error for now",
      stacktrace: error,
    } satisfies ApiErrorResponse);
  }
});
