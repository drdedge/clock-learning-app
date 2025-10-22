// Fractions Question Generators

const FRACTION_IMAGES = [
    { fraction: "1/2", image: "/images/fraction-half.svg" },
    { fraction: "1/3", image: "/images/fraction-third.svg" },
    { fraction: "1/4", image: "/images/fraction-quarter.svg" },
    { fraction: "3/4", image: "/images/fraction-three-quarters.svg" }
];

const FRACTION_OPTIONS = ["1/2", "1/3", "1/4", "3/4"];

// Common denominators for fraction questions
const COMMON_DENOMINATORS = [2, 3, 4, 5, 6, 8, 10, 12];

// Helper function to parse fraction string to object
const parseFraction = (f) => {
    const [n, d] = f.split('/').map(Number);
    return { numerator: n, denominator: d };
};

// Helper function to get GCD
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// Helper function to simplify fraction
const simplifyFraction = (num, den) => {
    const g = gcd(Math.abs(num), den);
    return { numerator: num / g, denominator: den / g };
};

// Helper function to convert fraction to decimal
const fractionToDecimal = (num, den) => {
    return Math.round((num / den) * 100) / 100;
};

// EXISTING GENERATORS (Updated with fractionVisual)

export const simpleFractions = () => {
    const choice = FRACTION_IMAGES[Math.floor(Math.random() * FRACTION_IMAGES.length)];
    const options = [...FRACTION_OPTIONS];
    const { numerator, denominator } = parseFraction(choice.fraction);

    return {
        question: "What fraction of the shape is shaded?",
        image: choice.image,
        options,
        answer: options.indexOf(choice.fraction),
        correctAnswer: choice.fraction,
        category: "Fractions",
        skill: "Recognising simple fractions",
        tip: "Count the shaded parts out of the whole",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'circle',
            numerator: numerator,
            denominator: denominator,
            mode: 'display'
        }
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

    const fracA = parseFraction(a);
    const fracB = parseFraction(b);

    return {
        question: `Which fraction is ${askBigger ? 'larger' : 'smaller'}: ${a} or ${b}?`,
        options: [a, b],
        answer: [a, b].indexOf(correct),
        correctAnswer: correct,
        category: "Fractions",
        skill: "Comparing fractions",
        tip: "Think about how much of the whole each fraction represents",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'numberLine',
            numerator: fracA.numerator,
            denominator: fracA.denominator,
            secondFraction: fracB,
            mode: 'compare'
        }
    };
};

// NEW GENERATORS

export const generateFractionAddition = () => {
    const denominator = COMMON_DENOMINATORS[Math.floor(Math.random() * COMMON_DENOMINATORS.length)];
    const num1 = Math.floor(Math.random() * (denominator - 1)) + 1;
    const num2 = Math.floor(Math.random() * (denominator - num1));

    const resultNum = num1 + num2;
    const simplified = simplifyFraction(resultNum, denominator);

    // Generate wrong answers
    const wrongAnswers = [
        `${num1 + num2}/${denominator * 2}`, // Common error: adding denominators
        `${Math.max(1, resultNum - 1)}/${denominator}`, // Off by one
        `${resultNum + 1}/${denominator}` // Off by one other direction
    ].filter((ans, i, arr) => arr.indexOf(ans) === i); // Remove duplicates

    const correctAnswer = simplified.denominator === denominator
        ? `${simplified.numerator}/${simplified.denominator}`
        : `${resultNum}/${denominator}`;

    const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        question: `What is ${num1}/${denominator} + ${num2}/${denominator}?`,
        options,
        answer: options.indexOf(correctAnswer),
        correctAnswer: correctAnswer,
        category: "Fractions",
        skill: "Adding fractions with same denominator",
        tip: "When denominators are the same, just add the numerators. Keep the denominator the same!",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'bar',
            numerator: num1,
            denominator: denominator,
            secondFraction: { numerator: num2, denominator: denominator },
            mode: 'display'
        }
    };
};

export const generateFractionSubtraction = () => {
    const denominator = COMMON_DENOMINATORS[Math.floor(Math.random() * COMMON_DENOMINATORS.length)];
    const num1 = Math.floor(Math.random() * (denominator - 2)) + 2; // Ensure num1 > num2
    const num2 = Math.floor(Math.random() * num1) + 1;

    const resultNum = num1 - num2;
    const simplified = simplifyFraction(resultNum, denominator);

    const correctAnswer = simplified.denominator === denominator
        ? `${simplified.numerator}/${simplified.denominator}`
        : `${resultNum}/${denominator}`;

    // Generate wrong answers
    const wrongAnswers = [
        `${resultNum}/${denominator * 2}`, // Common error
        `${Math.max(1, resultNum - 1)}/${denominator}`,
        `${resultNum + 1}/${denominator}`
    ].filter((ans, i, arr) => arr.indexOf(ans) === i);

    const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        question: `What is ${num1}/${denominator} - ${num2}/${denominator}?`,
        options,
        answer: options.indexOf(correctAnswer),
        correctAnswer: correctAnswer,
        category: "Fractions",
        skill: "Subtracting fractions with same denominator",
        tip: "When denominators are the same, just subtract the numerators. Keep the denominator the same!",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'bar',
            numerator: num1,
            denominator: denominator,
            secondFraction: { numerator: num2, denominator: denominator },
            mode: 'display'
        }
    };
};

export const generateEquivalentFractions = () => {
    const baseDenominator = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
    const baseNumerator = Math.floor(Math.random() * (baseDenominator - 1)) + 1;

    const multiplier = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
    const equivNum = baseNumerator * multiplier;
    const equivDen = baseDenominator * multiplier;

    const askFor = Math.random() > 0.5 ? 'larger' : 'smaller';
    const question = askFor === 'larger'
        ? `Which fraction is equivalent to ${baseNumerator}/${baseDenominator}?`
        : `Which fraction is equivalent to ${equivNum}/${equivDen}?`;

    const correctAnswer = askFor === 'larger'
        ? `${equivNum}/${equivDen}`
        : `${baseNumerator}/${baseDenominator}`;

    // Generate wrong answers
    const wrongAnswers = [
        `${equivNum + 1}/${equivDen}`,
        `${equivNum}/${equivDen + 1}`,
        `${equivNum + multiplier}/${equivDen}`
    ].filter((ans, i, arr) => arr.indexOf(ans) === i);

    const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    const displayFrac = askFor === 'larger'
        ? { numerator: baseNumerator, denominator: baseDenominator }
        : { numerator: equivNum, denominator: equivDen };

    return {
        question,
        options,
        answer: options.indexOf(correctAnswer),
        correctAnswer: correctAnswer,
        category: "Fractions",
        skill: "Finding equivalent fractions",
        tip: "Multiply or divide both the numerator and denominator by the same number to find equivalent fractions",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'circle',
            numerator: displayFrac.numerator,
            denominator: displayFrac.denominator,
            mode: 'display'
        }
    };
};

export const generateFractionToDecimal = () => {
    // Use fractions that convert nicely to decimals
    const niceDecimals = [
        { num: 1, den: 2, dec: 0.5 },
        { num: 1, den: 4, dec: 0.25 },
        { num: 3, den: 4, dec: 0.75 },
        { num: 1, den: 5, dec: 0.2 },
        { num: 2, den: 5, dec: 0.4 },
        { num: 3, den: 5, dec: 0.6 },
        { num: 4, den: 5, dec: 0.8 },
        { num: 1, den: 10, dec: 0.1 },
        { num: 3, den: 10, dec: 0.3 },
        { num: 7, den: 10, dec: 0.7 },
        { num: 9, den: 10, dec: 0.9 }
    ];

    const choice = niceDecimals[Math.floor(Math.random() * niceDecimals.length)];
    const correctAnswer = choice.dec.toString();

    // Generate wrong answers
    const wrongAnswers = [
        (choice.dec + 0.1).toFixed(1),
        (choice.dec - 0.1 > 0 ? choice.dec - 0.1 : choice.dec + 0.2).toFixed(1),
        (choice.num / (choice.den + 1)).toFixed(2)
    ].filter((ans, i, arr) => arr.indexOf(ans) === i);

    const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        question: `What is ${choice.num}/${choice.den} as a decimal?`,
        options,
        answer: options.indexOf(correctAnswer),
        correctAnswer: correctAnswer,
        category: "Fractions",
        skill: "Converting fractions to decimals",
        tip: "Divide the numerator by the denominator to get the decimal",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'bar',
            numerator: choice.num,
            denominator: choice.den,
            mode: 'display'
        }
    };
};

export const generateDecimalToFraction = () => {
    const niceDecimals = [
        { dec: "0.5", num: 1, den: 2 },
        { dec: "0.25", num: 1, den: 4 },
        { dec: "0.75", num: 3, den: 4 },
        { dec: "0.2", num: 1, den: 5 },
        { dec: "0.4", num: 2, den: 5 },
        { dec: "0.6", num: 3, den: 5 },
        { dec: "0.8", num: 4, den: 5 },
        { dec: "0.1", num: 1, den: 10 },
        { dec: "0.3", num: 3, den: 10 },
        { dec: "0.7", num: 7, den: 10 }
    ];

    const choice = niceDecimals[Math.floor(Math.random() * niceDecimals.length)];
    const correctAnswer = `${choice.num}/${choice.den}`;

    // Generate wrong answers
    const wrongAnswers = [
        `${choice.num}/${choice.den + 1}`,
        `${choice.num + 1}/${choice.den}`,
        `${choice.num}/${choice.den * 2}`
    ].filter((ans, i, arr) => arr.indexOf(ans) === i);

    const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        question: `What is ${choice.dec} as a fraction in its simplest form?`,
        options,
        answer: options.indexOf(correctAnswer),
        correctAnswer: correctAnswer,
        category: "Fractions",
        skill: "Converting decimals to fractions",
        tip: "Think about place value: 0.5 means 5 tenths, which simplifies to 1/2",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'bar',
            numerator: choice.num,
            denominator: choice.den,
            mode: 'display'
        }
    };
};

export const generateFractionComparison = () => {
    // Generate two fractions with different denominators
    const denominators = [2, 3, 4, 5, 6, 8];
    const den1 = denominators[Math.floor(Math.random() * denominators.length)];
    let den2;
    do {
        den2 = denominators[Math.floor(Math.random() * denominators.length)];
    } while (den2 === den1);

    const num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
    const num2 = Math.floor(Math.random() * (den2 - 1)) + 1;

    const val1 = num1 / den1;
    const val2 = num2 / den2;

    const symbols = ['>', '<', '='];
    let correctSymbol;
    if (Math.abs(val1 - val2) < 0.01) {
        correctSymbol = '=';
    } else if (val1 > val2) {
        correctSymbol = '>';
    } else {
        correctSymbol = '<';
    }

    const correctAnswer = correctSymbol;
    const options = symbols;

    return {
        question: `Compare these fractions: ${num1}/${den1} ___ ${num2}/${den2}`,
        options,
        answer: options.indexOf(correctAnswer),
        correctAnswer: correctAnswer,
        category: "Fractions",
        skill: "Comparing fractions with different denominators",
        tip: "Convert to common denominators or think about their position on a number line",
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'numberLine',
            numerator: num1,
            denominator: den1,
            secondFraction: { numerator: num2, denominator: den2 },
            mode: 'compare'
        }
    };
};

export const generateFractionOfAmount = () => {
    const fractions = [
        { num: 1, den: 2 },
        { num: 1, den: 3 },
        { num: 1, den: 4 },
        { num: 1, den: 5 },
        { num: 2, den: 3 },
        { num: 3, den: 4 },
        { num: 2, den: 5 },
        { num: 3, den: 5 }
    ];

    const frac = fractions[Math.floor(Math.random() * fractions.length)];

    // Generate amount that's divisible by denominator
    const multiplier = Math.floor(Math.random() * 5) + 2; // 2-6
    const amount = frac.den * multiplier;

    const correctAnswer = ((frac.num * amount) / frac.den).toString();

    // Generate wrong answers
    const wrongAnswers = [
        (parseInt(correctAnswer) + frac.den).toString(),
        (parseInt(correctAnswer) - frac.den).toString(),
        (amount - parseInt(correctAnswer)).toString()
    ].filter((ans, i, arr) => arr.indexOf(ans) === i && ans !== correctAnswer);

    const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        question: `What is ${frac.num}/${frac.den} of ${amount}?`,
        options,
        answer: options.indexOf(correctAnswer),
        correctAnswer: correctAnswer,
        category: "Fractions",
        skill: "Finding fractions of amounts",
        tip: `Divide ${amount} by ${frac.den}, then multiply by ${frac.num}`,
        inputType: "multiple-choice",
        fractionVisual: {
            type: 'grid',
            numerator: frac.num,
            denominator: frac.den,
            mode: 'display'
        }
    };
};

export const generateMixedNumbers = () => {
    const convertTo = Math.random() > 0.5 ? 'improper' : 'mixed';

    if (convertTo === 'improper') {
        // Convert mixed number to improper fraction
        const whole = Math.floor(Math.random() * 3) + 1; // 1-3
        const denominator = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)];
        const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;

        const improperNum = whole * denominator + numerator;
        const correctAnswer = `${improperNum}/${denominator}`;

        // Generate wrong answers
        const wrongAnswers = [
            `${improperNum + 1}/${denominator}`,
            `${improperNum - 1}/${denominator}`,
            `${whole * numerator}/${denominator}`
        ].filter((ans, i, arr) => arr.indexOf(ans) === i);

        const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return {
            question: `Convert ${whole} ${numerator}/${denominator} to an improper fraction`,
            options,
            answer: options.indexOf(correctAnswer),
            correctAnswer: correctAnswer,
            category: "Fractions",
            skill: "Converting mixed numbers to improper fractions",
            tip: `Multiply ${whole} by ${denominator}, then add ${numerator}`,
            inputType: "multiple-choice",
            fractionVisual: {
                type: 'circle',
                numerator: numerator,
                denominator: denominator,
                mode: 'display'
            }
        };
    } else {
        // Convert improper fraction to mixed number
        const denominator = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
        const whole = Math.floor(Math.random() * 3) + 1; // 1-3
        const remainder = Math.floor(Math.random() * (denominator - 1)) + 1;
        const improperNum = whole * denominator + remainder;

        const correctAnswer = remainder === 0 ? whole.toString() : `${whole} ${remainder}/${denominator}`;

        // Generate wrong answers
        const wrongAnswers = [
            `${whole + 1} ${remainder}/${denominator}`,
            `${whole} ${remainder + 1}/${denominator}`,
            `${whole - 1} ${remainder}/${denominator}`
        ].filter((ans, i, arr) => arr.indexOf(ans) === i && ans !== correctAnswer);

        const options = [correctAnswer, ...wrongAnswers].slice(0, 4);
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return {
            question: `Convert ${improperNum}/${denominator} to a mixed number`,
            options,
            answer: options.indexOf(correctAnswer),
            correctAnswer: correctAnswer,
            category: "Fractions",
            skill: "Converting improper fractions to mixed numbers",
            tip: `Divide ${improperNum} by ${denominator} to find the whole number and remainder`,
            inputType: "multiple-choice",
            fractionVisual: {
                type: 'bar',
                numerator: improperNum,
                denominator: denominator,
                mode: 'display'
            }
        };
    }
};

// Export all generators
const fractionGenerators = {
    simpleFractions,
    comparingFractions,
    generateFractionAddition,
    generateFractionSubtraction,
    generateEquivalentFractions,
    generateFractionToDecimal,
    generateDecimalToFraction,
    generateFractionComparison,
    generateFractionOfAmount,
    generateMixedNumbers
};

export default fractionGenerators;
