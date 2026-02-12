import { model, Schema } from "mongoose";

export const thingSchema = new Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true, minLength: 3 },
  objective: { type: Boolean, required: true },
});

export const ThingModel = model("Thing", thingSchema);
