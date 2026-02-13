import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.mjs";
import type { UserDTO } from "../models/UserDTO.mjs";

export const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || name === "") {
      res
        .status(400)
        .json({ message: "body does not contain name or is empty" });
      return;
    }
    const newUser: UserDTO = await createUser(name, email);

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users: UserDTO[] = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

userRouter.get("/:userid",  async (req, res) => {
  try {
    const { userid } = req.params;

    const success = await getUserById(userid);

    if (!success) {
      res.status(200).json({message: "can't find any user with id " +userid});
      return false;
    }

    res.status(200).json(success);
  } catch (error) {
    res.status(500).json(error);
  }
})

userRouter.patch("/addthing/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const { someThing } = req.body;

    if (!someThing || someThing === "") {
      res.status(400).json({ message: "body does not contain someThing" });
      return;
    }

    const success: boolean = await updateUser(userid, someThing);

    if (success) {
      res.status(204).send();
    } else {
      res.status(500).json({message: "something went wrong"});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

