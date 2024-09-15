// reference: https://www.youtube.com/watch?v=W5oawMJaXbU

// These chars caused problem so replaced
// const japaneseKatakanaChars =
//     "ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ハ ヒ フ ヘ ホ マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ ワ ヲ ン";
const japaneseChars =
    "｢｣ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
// Lower case looks better
const latinChars = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const misc = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";
const matrixRainChars = [japaneseChars, latinChars, numbers, misc].join("");

const config = {
    chars: matrixRainChars,
    charChangeSpeedMS: 20,
    // How much animation time is added to each following letter
    durationIncrement: 0.3,
};

export function getRandomInt({ min, max }: { min: number; max: number }) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomChar() {
    const i = getRandomInt({ min: 0, max: matrixRainChars.length - 1 });
    return config.chars[i];
}

const dropHead: HTMLParagraphElement | null =
    document.querySelector("#dropHead");
const lead: HTMLParagraphElement | null = document.querySelector("#lead");

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

                return getRandomChar();
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }

        iterations += config.durationIncrement;
    }, config.charChangeSpeedMS);
}

if (dropHead && lead) {
    scrambleText(dropHead);
    scrambleText(lead);
}

export {};
