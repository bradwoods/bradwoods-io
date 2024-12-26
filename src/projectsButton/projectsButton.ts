const button = document.querySelector("button#projects");

function onClick() {
    document.body.setAttribute("data-state", "projects");
    button?.removeEventListener("click", onClick);
}

button?.addEventListener("click", onClick);
