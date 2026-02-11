import type QueryString from "qs";
import { everyThing } from "../data/everyThing.mjs";
import type { SomeThing } from "../models/SomeThing.mjs";

export const createThing = (thingName: string) => {
  const newThing: SomeThing = { id: Date.now(), name: thingName, done: false };

  everyThing.push(newThing);

  return newThing;
};

export const getThings = (
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
  let filteredThings = [...everyThing];

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

export const getThing = (id: string) =>
  everyThing.find((thing) => thing.id === +id);

export const updateThing = (thing: SomeThing) => {
  const found = everyThing.find((t) => t.id === thing.id);

  if (found) {
    found.name = thing.name;
    found.done = thing.done;
  }

  return found;
};

export const removeThing = (id: string) => {
  const index = everyThing.findIndex((thing) => thing.id === +id);

  if (index >= 0) {
    everyThing.splice(index, 1);
    return true;
  }

  return false;
};
