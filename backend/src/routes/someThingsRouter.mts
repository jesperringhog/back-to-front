import express from "express";
import type { SomeThing } from "../models/SomeThing.mjs";
import { someThings } from "../data/someThings.mjs";
import type { ApiResponseError } from "../models/ApiResponseError.mjs";
import type { ApiResponse } from "../models/ApiResponse.mjs";

export const someThingsRouter = express.Router();

someThingsRouter.get("/", (req, res) => {
  try {
    const { search, sort } = req.query;

    let filteredThings = someThings;

    if (search) {
      filteredThings = someThings.filter((t) =>
        t.name.toLowerCase().includes(search.toString()),
      );
    }

    if (sort) {
      const direction = sort === "asc" ? 1 : -1;
      filteredThings.sort((a, b) => (a.id - b.id) * direction);
    }

    res.status(200).json(filteredThings);
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      stacktrace: error,
    } satisfies ApiResponseError);
  }
});

someThingsRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const foundThing = someThings.find((t) => t.id === +id);

    if (foundThing) {
      res.status(200).json(foundThing);
    } else {
      res
        .status(400)
        .json({
          message: "didn't found a thing with id: " + id,
        } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      stacktrace: error,
    } satisfies ApiResponseError);
  }
});

someThingsRouter.post("/", (req, res) => {
  try {
    const { createThing } = req.body;

    const newThing: SomeThing = { id: Date.now(), name: createThing };

    if (createThing) {
      someThings.push(newThing);
      res.status(201).json(newThing);
    } else {
      res
        .status(400)
        .json({
          message: newThing + "is a invalid thing",
        } satisfies ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      stacktrace: error,
    } satisfies ApiResponseError);
  }
});

someThingsRouter.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const index = someThings.findIndex((t) => t.id === +id);

    if (index >= 0) {
      someThings.splice(index, 1);
      res.status(204).json();
    } else {
      res.status(404).json({ message: "no existing thing with id " + id });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "no thing to delete",
        stacktrace: error,
      } satisfies ApiResponseError);
  }
});
