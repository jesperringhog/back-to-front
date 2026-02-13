import { model, Schema, type InferSchemaType } from "mongoose";
import { thingSchema } from "./ThingSchema.mjs";
import type { UserDTO } from "./UserDTO.mjs";
import type { ThingDTO } from "./ThingDTO.mjs";

const userSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true, minLength: 3 },
  email: { type: String, required: false },
  things: [thingSchema],
});

export const User = model("user", userSchema);

export type UserFromDb = InferSchemaType<typeof userSchema>;

export const convertDbUserToDto = (dbuser: UserFromDb): UserDTO => {
  return {
    id: dbuser.id,
    name: dbuser.name,
    things: dbuser.things.map((t) => {
      return {
        id: t.id,
        text: t.text,
        objective: t.objective,
      } satisfies ThingDTO;
    }),
  } satisfies UserDTO;
};
