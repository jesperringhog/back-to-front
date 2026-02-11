import { model, Schema } from "mongoose";

const thingSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true, minLength: 3 },
    done: Boolean
})

export const ThingModel = model("Thing", thingSchema);