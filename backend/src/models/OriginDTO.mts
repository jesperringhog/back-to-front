import type { ThingDTO } from "./ThingDTO.mjs"

export type OriginDTO = {
    id: number,
    category: string,
    things: ThingDTO[];
}