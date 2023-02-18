// https://www.youtube.com/watch?v=W5oawMJaXbU

const lettersLowerCase = "abcdefghijklmnopqrstuvwxyz";
const lettersUpperCase = lettersLowerCase.toUpperCase();

const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const description: HTMLParagraphElement | null =
    document.querySelector("header p");
const projects = document.querySelectorAll("main span");

function scrambleText({
    element,
    isUpperCase = false,
}: {
    element: HTMLElement;
    isUpperCase?: boolean;
}) {
    const letters = isUpperCase ? lettersUpperCase : lettersLowerCase;
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

if (h1 && h2 && description && projects) {
    scrambleText({ element: h1, isUpperCase: true });
    scrambleText({ element: h2, isUpperCase: true });
    scrambleText({ element: description });

    projects.forEach((project) => {
        scrambleText({ element: project as HTMLElement });
    });
}

export {};
