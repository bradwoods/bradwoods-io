// https://www.youtube.com/watch?v=W5oawMJaXbU

const letters = "abcdefghijklmnopqrstuvwxyz";

const dropHead: HTMLParagraphElement | null =
    document.querySelector("#dropHead");
const lead: HTMLParagraphElement | null = document.querySelector("#lead");
const projects = document.querySelectorAll("main span");

function scrambleText(element: HTMLElement) {
    const originalText = element.innerText;

    let iterations = 0;

    const interval = setInterval(() => {
        element.innerText = element.innerText
            .split("")
            .map((_, i) => {
                if (i < iterations) {
                    return originalText[i];
                }

                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iterations >= originalText.length) clearInterval(interval);

        iterations += 1 / 3;
    }, 30);
}

if (dropHead && lead && projects) {
    scrambleText(dropHead);
    scrambleText(lead);

    projects.forEach((project) => {
        scrambleText(project as HTMLElement);
    });
}

export {};
