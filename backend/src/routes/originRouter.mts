import express from "express";
import {
  createOrigin,
  getOrigins,
  updateOrigin,
} from "../controllers/originController.mjs";
import type { OriginDTO } from "../models/OriginDTO.mjs";

export const originRouter = express.Router();

originRouter.post("/", async (req, res) => {
  try {
    const { category, element } = req.body;

    if (!category || category === "") {
      res
        .status(400)
        .json({ message: "body does not contain category or is empty" });
      return;
    }
    const newOrigin: OriginDTO = await createOrigin(category, element);

    res.status(200).json(newOrigin);
  } catch (error) {
    res.status(500).json(error);
  }
});

originRouter.get("/", async (req, res) => {
  try {
    const origins: OriginDTO[] = await getOrigins();

    res.status(200).json(origins);
  } catch (error) {
    res.status(500).json(error);
  }
});

originRouter.patch("/addthing/:originid", async (req, res) => {
  try {
    const { originid } = req.params;
    const { someThing } = req.body;

    if (!someThing || someThing === "") {
      res.status(400).json({ message: "body does not contain someThing" });
      return;
    }

    const success: boolean = await updateOrigin(originid, someThing);

    if (success) {
      res.status(204).send();
    } else {
      res.status(500).json({message: "something went wrong"});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
