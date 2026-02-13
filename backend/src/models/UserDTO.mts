import type { ThingDTO } from "./ThingDTO.mjs"

export type UserDTO = {
    id: number,
    name: string,
    things: ThingDTO[];
}