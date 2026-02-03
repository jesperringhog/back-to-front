import type { SomeThing } from "../models/SomeThing";

export const createHtml = (things: SomeThing[]) => {
    const someList = document.getElementById("someList");
    if (!someList) return;
    someList.innerHTML = "";

    things.forEach((thing) => {
        const listItem = document.createElement("li");
        const id = document.createElement("h2");
        const name = document.createElement("h4");

        id.innerHTML = thing.id.toString();
        name.innerHTML = thing.name;

        listItem.appendChild(id);
        listItem.appendChild(name);
        someList.appendChild(listItem);
    })
}