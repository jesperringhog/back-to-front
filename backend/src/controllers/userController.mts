import type { UserDTO } from "../models/UserDTO.mjs";
import { convertDbUserToDto, User, type UserFromDb } from "../models/User.mjs";
import type { ThingDTO } from "../models/ThingDTO.mjs";

export const createUser = async (name: string, email: string) => {
  const newUser = {
    id: Date.now(),
    name,
    email,
    things: [],
  };

  const createdUser = await User.create(newUser);

  return convertDbUserToDto(createdUser);
};

export const getUsers = async () => {
  const usersFromDb = await User.find();

  return usersFromDb.map((u) => convertDbUserToDto(u));
};

export const getUserById = async (userid: string) => {
  const userFromDb = await User.findOne({ id: +userid })

  if (userFromDb?.id !== +userid) return false;

  return convertDbUserToDto(userFromDb);
}

export const updateUser = async (userid: string, text: string) => {
    const foundUser = await User.findOne({id: +userid})

    if (!foundUser) return false;

    const newThing: ThingDTO = {
        id: Date.now(),
        text,
        objective: false
    }

    foundUser.things.push(newThing);

    await foundUser.save();

    return true;
}
