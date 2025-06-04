// Fractions Question Generators

const FRACTION_IMAGES = [
    { fraction: "1/2", image: "/images/fraction-half.svg" },
    { fraction: "1/3", image: "/images/fraction-third.svg" },
    { fraction: "1/4", image: "/images/fraction-quarter.svg" },
    { fraction: "3/4", image: "/images/fraction-three-quarters.svg" }
];

const FRACTION_OPTIONS = ["1/2", "1/3", "1/4", "3/4"];

export const simpleFractions = () => {
    const choice = FRACTION_IMAGES[Math.floor(Math.random() * FRACTION_IMAGES.length)];
    const options = [...FRACTION_OPTIONS];

    return {
        question: "What fraction of the shape is shaded?",
        image: choice.image,
        options,
        answer: options.indexOf(choice.fraction),
        correctAnswer: choice.fraction,
        category: "Fractions",
        skill: "Recognising simple fractions",
        tip: "Count the shaded parts out of the whole",
        inputType: "multiple-choice"
    };
};

export const comparingFractions = () => {
    const [a, b] = [
        FRACTION_OPTIONS[Math.floor(Math.random() * FRACTION_OPTIONS.length)],
        FRACTION_OPTIONS[Math.floor(Math.random() * FRACTION_OPTIONS.length)]
    ];
    if (a === b) return comparingFractions();

    const toValue = (f) => {
        const [n, d] = f.split('/').map(Number);
        return n / d;
    };
    const askBigger = Math.random() > 0.5;
    const correct = askBigger ? (toValue(a) > toValue(b) ? a : b) : (toValue(a) < toValue(b) ? a : b);

    return {
        question: `Which fraction is ${askBigger ? 'larger' : 'smaller'}: ${a} or ${b}?`,
        options: [a, b],
        answer: [a, b].indexOf(correct),
        correctAnswer: correct,
        category: "Fractions",
        skill: "Comparing fractions",
        tip: "Think about how much of the whole each fraction represents",
        inputType: "multiple-choice"
    };
};

const fractionGenerators = {
    simpleFractions,
    comparingFractions
};

export default fractionGenerators;
