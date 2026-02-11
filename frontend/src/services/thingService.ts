import type { SomeThing } from "../models/SomeThing";

const baseUrl = "http://localhost:3000/everything/";

export const createThing = async (something: string) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ bodyPart: something }),
    });
    const data: SomeThing = await response.json();
    return data;
  } catch {
    console.error("can't fetch anything");
  }
};

export const getThings = async () => {
  try {
    const response = await fetch(baseUrl);
    const data: SomeThing[] = await response.json();
    return data;
  } catch (error) {
    console.error("can't fetch anything");

    return [];
  }
};

// export const getThing = async (id: string) => {
//   const response = await fetch(`baseUrl${id}`);
//   const data: SomeThing = await response.json();
//   return data;
// };

export const updateThing = async (id: number, someThing: SomeThing) => {
  try {
    const response = await fetch(`${baseUrl}${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ someThing })
    });

    return response.ok;
  } catch (error) {
    return false;
  }
};

export const removeThing = async(id: number) => {
  try {
  const response = await fetch(`${baseUrl}${id}`, {
    method: "DELETE"
  });

  return response.ok;
  } catch {
    return false;
  }

}
