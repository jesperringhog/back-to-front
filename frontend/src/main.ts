import { createSomeThing, getSomeThings } from './services/someService';
import './style.css'
import { createHtml } from './utils/htmlUtil';

document.getElementById("someForm")?.addEventListener("submit", async(e) => {
    e.preventDefault();

    const someInput = document.getElementById("someInput");

    let userInput = ""
    if (someInput) {
        userInput = (someInput as HTMLInputElement).value;
    }

    const data = await createSomeThing(userInput);
    console.log(data);
    

    const someThings = await getSomeThings();

    createHtml(someThings);
})

const data = await getSomeThings();
createHtml(data);