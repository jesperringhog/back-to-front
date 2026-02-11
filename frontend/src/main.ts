import { createThing, getThings } from "./services/thingService";
import "./style.css";
import { createHtml } from "./utils/htmlUtil";

document.getElementById("thingForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const thingInput = document.getElementById("thingInput") as HTMLInputElement;

  let userInput = "";
  if (thingInput) {
    userInput = thingInput.value;
  }

  const data = await createThing(userInput);
  console.log(data);

  if (userInput) {
    userInput = "";
  }

  const everything = await getThings();
  createHtml(everything);
});

const data = await getThings();
createHtml(data);
