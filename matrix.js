const PARENT_ELEMENT_WIDTH_PX = 220;
const CHAR_COUNT = 17;
const COL_COUNT = 8;

const speedMS = {
    max: 34,
    min: 200,
};
const delayMS = {
    max: 2000,
    min: 0,
};

const opacities = [
    ...Array(CHAR_COUNT).fill(0),
    ...Array(CHAR_COUNT)
        .fill(null)
        .map((_, i) => 1 - i / CHAR_COUNT),
];

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
    return Math.floor(getRandom(0, max));
}

function getColLeftPX() {
    return getRandomInt(PARENT_ELEMENT_WIDTH_PX - 16);
}

function getRandomChar() {
    const ascii = `0123456789abcdefghijklmnopqrstuvwxyz`;
    const kana = `｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ`;
    const chars = [...ascii.split(""), ...kana.split("")];

    const index = getRandomInt(chars.length);
    return chars[index];
}

function getChars() {
    return Array(CHAR_COUNT)
        .fill(null)
        .map(() => getRandomChar());
}

function getDelayMS() {
    const { min, max } = delayMS;
    return getRandom(min, max);
}

function getSpeedMS() {
    const { min, max } = speedMS;
    return getRandom(min, max);
}

function addCharsToCol(col) {
    const chars = getChars();
    const colSpans = [];

    chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = 0;
        colSpans.push(span);
        col.appendChild(span);
    });

    colSpans.reverse();

    return colSpans;
}

function createCol(leftPX) {
    const col = document.createElement("div");
    col.className = "col";
    col.style.left = `${leftPX}px`;

    return col;
}

function animateSpans(spans) {
    let colOpacities = [...opacities];

    function start() {
        setInterval(() => {
            spans.forEach((span, i) => {
                span.style.opacity = colOpacities[i] || 0;
            });

            if (colOpacities.length === 0) {
                colOpacities = [...opacities];
            } else {
                colOpacities.shift();
            }
        }, getSpeedMS());
    }

    setTimeout(start, getDelayMS());
}

function init() {
    const section = document.querySelector(".matrix");

    // There always need to be a column on the left & right edges
    const colLefts = [
        0,
        212,
        ...Array(COL_COUNT - 2)
            .fill(null)
            .map(() => getColLeftPX()),
    ];
    const cols = colLefts.map((left) => createCol(left));
    const spans = cols.map((col) => addCharsToCol(col));

    spans.forEach((colSpans) => animateSpans(colSpans));
    cols.forEach((col) => {
        section.appendChild(col);
    });
}

init();
