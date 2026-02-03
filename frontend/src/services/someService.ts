import type { SomeThing } from "../models/SomeThing";

const baseUrl = "http://localhost:3000/somethings/";

export const createSomeThing = async (userInput: string) => {
  try {
    const response = await fetch(`${baseUrl}${userInput}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ createThing: userInput }),
    });
    const data: SomeThing[] = await response.json();
    return data;
  } catch {
    console.error("couldn't fetch a thing...");
    return [];
  }
};

export const getSomeThings = async () => {
  try {
    const response = await fetch(baseUrl);
    const data: SomeThing[] = await response.json();
    return data;
  } catch {
    console.error("couldn't fetch a thing...");
    return [];
  }
};
