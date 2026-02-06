import type { SomeThing } from "../models/SomeThing";

export const createHtml = (everything: SomeThing[]) => {
    const thingList = document.getElementById("thingList");
    if (!thingList) return;
    thingList.innerHTML = "";

    everything.forEach((thing) => {
        const listItem = document.createElement("li");
        const id = document.createElement("h2");
        const name = document.createElement("h4");

        listItem.className = "listItem";
        id.innerHTML = thing.id.toString();
        name.innerHTML = thing.name;

        listItem.appendChild(id);
        listItem.appendChild(name);
        thingList.appendChild(listItem);
    })
}