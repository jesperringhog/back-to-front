import type QueryString from "qs";
// import { everyThing } from "../data/everyThing.mjs";
import type { Thing } from "../models/Thing.mjs";
import { ThingModel } from "../models/ThingSchema.mjs";

export const createThing = async (someThing: string) => {
  // const newThing: Thing = { id: Date.now(), name: someThing, done: false };

  // everyThing.push(newThing);

  const newThing = await ThingModel.create({ id: Date.now(), name: someThing });

  return newThing;
};

export const getThings = async (
  filter:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
  sort:
    | string
    | QueryString.ParsedQs
    | (string | QueryString.ParsedQs)[]
    | undefined,
) => {
  const things = await ThingModel.find();

  let filteredThings = [...things];

  if (filter) {
    filteredThings = filteredThings.filter((thing) =>
      thing.name.toLowerCase().includes(filter.toString()),
    );
  }

  if (sort) {
    const direction = sort === "asc" ? 1 : -1;
    filteredThings = filteredThings.sort((a, b) => (a.id - b.id) * direction);
  }

  return filteredThings;
};

export const getThing = async (id: string) =>
  // everyThing.find((thing) => thing.id === +id);
  await ThingModel.findOne({ id: +id });

export const updateThing = async (thing: Thing) => {
  // const found = everyThing.find((t) => t.id === thing.id);

  // if (found) {
  //   found.name = thing.name;
  //   found.done = thing.done;
  // }
  
  await ThingModel.findOneAndUpdate({ id: thing.id }, thing);

  return thing;
};

export const removeThing = async (id: string) => {
  // const index = everyThing.findIndex((thing) => thing.id === +id);

  // if (index >= 0) {
  //   // everyThing.splice(index, 1);
  //   return true;
  // }

  const removedThing = await ThingModel.findOneAndDelete({ id: +id });

  if (removedThing) {
    return true;
  }

  return false;
};
