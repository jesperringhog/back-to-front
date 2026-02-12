import { model, Schema } from "mongoose";
import { thingSchema } from "./ThingSchema.mjs";

const originSchema = new Schema({
    id: {type: Number, required: true},
    category: {type: String, required: true, minLength: 3},
    element: {type: String, required: false},
    things: [thingSchema]
})

export const Origin = model("origin", originSchema);