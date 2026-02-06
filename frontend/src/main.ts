import { getThing, getThings } from './services/thingService';
import './style.css'
import { createHtml } from './utils/htmlUtil';

document.getElementById("thingForm")?.addEventListener("submit", async(e) => {
    e.preventDefault();

    const thingInput = (document.getElementById("thingInput") as HTMLInputElement);

    let userInput = "";
    if (thingInput) {
        userInput = thingInput.value;
    }

    const data = await getThing(userInput);
    createHtml(data);
})

const data = await getThings();
createHtml(data);