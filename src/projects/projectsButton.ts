import { scrambleText } from "../scambleText";

const button = document.querySelector("section.projects button");
const linksText: NodeListOf<HTMLElement> = document.querySelectorAll(
    "section.projects a span"
);

function onClick() {
    document.body.setAttribute("data-state", "projects");
    linksText.forEach(scrambleText);
    button?.removeEventListener("click", onClick);
}

button?.addEventListener("click", onClick);
