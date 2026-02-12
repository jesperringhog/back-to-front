import type { OriginDTO } from "../models/OriginDTO.mjs";
import { Origin } from "../models/OriginSchema.mjs";
import type { ThingDTO } from "../models/ThingDTO.mjs";

export const createOrigin = async (category: string, element: string) => {
  const newOrigin = {
    id: Date.now(),
    category,
    element,
    things: [],
  };

  const createdOrigin: OriginDTO = await Origin.create(newOrigin);

  return {
    id: createdOrigin.id,
    category: createdOrigin.category,
    things: createdOrigin.things.map((t) => {
      return {
        id: t.id,
        text: t.text,
        objective: t.objective,
      } satisfies ThingDTO;
    }),
  } satisfies OriginDTO;
};

export const getOrigins = async () => {
  const originsFromDb = await Origin.find();

  const dtos: OriginDTO[] = originsFromDb.map((originFromDB) => {
    return {
      id: originFromDB.id,
      category: originFromDB.category,
      things: originFromDB.things.map((t) => {
        return {
          id: t.id,
          text: t.text,
          objective: t.objective,
        } satisfies ThingDTO;
      }),
    } satisfies OriginDTO;
  });

  return dtos;
};

export const updateOrigin = async (originid: string, text: string) => {
    const foundOrigin = await Origin.findOne({id: +originid})

    if (!foundOrigin) return false;

    const newThing: ThingDTO = {
        id: Date.now(),
        text,
        objective: false
    }

    foundOrigin.things.push(newThing);

    await foundOrigin.save();

    return true;
}
