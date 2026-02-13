import type { SomeThing } from "../models/SomeThing";
import { getThings, removeThing, updateThing } from "../services/thingService";

export const createHtml = (everything: SomeThing[]) => {
  const thingList = document.getElementById("thingList");
  if (!thingList) return;
  thingList.innerHTML = "";

  everything.forEach((thing) => {
    const listItem = document.createElement("li");
    const id = document.createElement("h2");
    const text = document.createElement("h4");
    const updateBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    listItem.className = "listItem";
    id.innerHTML = thing.id.toString();
    text.innerHTML = thing.text;
    updateBtn.innerHTML = "Update";

    if (thing.objective) {
      text.className = "done";
    }

    updateBtn.addEventListener("click", async () => {
      const success = await updateThing(thing.id, {
        ...thing,
        objective: !thing.objective,
      });

      if (success) {
        const everything = await getThings();
        createHtml(everything);
      }
    });

    removeBtn.innerHTML = "Remove";

    removeBtn.addEventListener("click", async () => {
      const success = await removeThing(thing.id);

      if (success) {
        const everyThing = await getThings();
        createHtml(everyThing);
      }
    });

    listItem.appendChild(id);
    listItem.appendChild(text);
    listItem.appendChild(updateBtn);
    listItem.appendChild(removeBtn);
    thingList.appendChild(listItem);
  });
};
