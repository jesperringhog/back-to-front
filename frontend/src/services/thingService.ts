import type { SomeThing } from "../models/SomeThing";

const baseUrl = "http://localhost:3000/everything/";

// export const createThing = async(userInput: string) => {
//   const response = await fetch(`baseUrl${userInput}`);
//   const data: SomeThing[] = await response.json();
//   return data;
// }

export const getThings = async () => {
  const response = await fetch(baseUrl);
  const data: SomeThing[] = await response.json();
  return data;
};

export const getThing = async (id: number) => {
  const response = await fetch(`baseUrl${id}`);
  const data: SomeThing = await response.json();
  return data;
};
