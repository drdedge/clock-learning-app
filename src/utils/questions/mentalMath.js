// Mental Math Question Generators

const MULTIPLICATION_CONTEXTS = [
    { setup: "wheels on cars", multiplier: 4, unit: "cars" },
    { setup: "legs on stools", multiplier: 3, unit: "stools" },
    { setup: "fingers on hands", multiplier: 5, unit: "hands" },
    { setup: "eggs in boxes", multiplier: 6, unit: "boxes" },
    { setup: "flowers in bunches", multiplier: 5, unit: "bunches" },
    { setup: "legs on dogs", multiplier: 4, unit: "dogs" },
    { setup: "wheels on tricycles", multiplier: 3, unit: "tricycles" },
    { setup: "wings on birds", multiplier: 2, unit: "birds" },
    { setup: "eyes on faces", multiplier: 2, unit: "faces" },
    { setup: "corners on triangles", multiplier: 3, unit: "triangles" }
];

export const multiplicationAsRepeatedAddition = () => {
    const context = MULTIPLICATION_CONTEXTS[Math.floor(Math.random() * MULTIPLICATION_CONTEXTS.length)];
    const count = Math.floor(Math.random() * 8) + 3;

    return {
        question: `There are ${context.multiplier} ${context.setup}. How many ${context.setup.split(' ')[0]} are there on ${count} ${context.unit}?`,
        answer: count * context.multiplier,
        category: "Mental Math",
        skill: "Multiplication as repeated addition",
        tip: `Count in ${context.multiplier}s: ${context.multiplier}, ${context.multiplier * 2}, ${context.multiplier * 3}...`,
        inputType: "number"
    };
};

export const doublingNumbers = () => {
    const number = Math.floor(Math.random() * 20) + 5;
    
    const contexts = [
        `What is double ${number}?`,
        `I have ${number} stickers. My friend has the same amount. How many stickers do we have together?`,
        `There are ${number} apples in one basket and ${number} apples in another basket. How many apples in total?`,
        `${number} + ${number} = ?`
    ];
    
    const context = contexts[Math.floor(Math.random() * contexts.length)];

    return {
        question: context,
        answer: number * 2,
        category: "Mental Math",
        skill: "Doubling numbers",
        tip: `Double means × 2 or add the number to itself`,
        inputType: "number"
    };
};

export const halvingNumbers = () => {
    const number = Math.floor(Math.random() * 20 + 1) * 2; // Ensure even number
    
    const contexts = [
        `What is half of ${number}?`,
        `I have ${number} cookies to share equally between 2 people. How many does each person get?`,
        `${number} ÷ 2 = ?`,
        `If I split ${number} marbles into 2 equal groups, how many are in each group?`
    ];
    
    const context = contexts[Math.floor(Math.random() * contexts.length)];

    return {
        question: context,
        answer: number / 2,
        category: "Mental Math",
        skill: "Halving numbers",
        tip: `Half means ÷ 2 or splitting into 2 equal groups`,
        inputType: "number"
    };
};

export const addingTens = () => {
    const base = Math.floor(Math.random() * 50) + 10;
    const tens = Math.floor(Math.random() * 5 + 1) * 10;
    
    const contexts = [
        `${base} + ${tens} = ?`,
        `Start at ${base} and count on ${tens}. What number do you reach?`,
        `I have ${base}p and I find ${tens}p more. How much money do I have now?`
    ];
    
    const context = contexts[Math.floor(Math.random() * contexts.length)];

    return {
        question: context,
        answer: base + tens,
        category: "Mental Math",
        skill: "Adding tens",
        tip: `When adding tens, only the tens digit changes`,
        inputType: "number"
    };
};

export const subtractingTens = () => {
    const result = Math.floor(Math.random() * 50) + 10;
    const tens = Math.floor(Math.random() * 5 + 1) * 10;
    const start = result + tens;
    
    const contexts = [
        `${start} - ${tens} = ?`,
        `Start at ${start} and count back ${tens}. What number do you reach?`,
        `I have ${start}p and I spend ${tens}p. How much money do I have left?`
    ];
    
    const context = contexts[Math.floor(Math.random() * contexts.length)];

    return {
        question: context,
        answer: result,
        category: "Mental Math",
        skill: "Subtracting tens",
        tip: `When subtracting tens, only the tens digit changes`,
        inputType: "number"
    };
};

export const countingInMultiples = () => {
    const multiples = [2, 5, 10];
    const multiple = multiples[Math.floor(Math.random() * multiples.length)];
    const start = multiple * Math.floor(Math.random() * 3 + 1);
    const count = Math.floor(Math.random() * 4 + 3);
    
    const sequence = [];
    for (let i = 0; i < count; i++) {
        sequence.push(start + (i * multiple));
    }
    
    return {
        question: `Continue counting in ${multiple}s: ${sequence.join(', ')}, ?`,
        answer: start + (count * multiple),
        category: "Mental Math",
        skill: `Counting in ${multiple}s`,
        tip: `Add ${multiple} to the last number`,
        inputType: "number"
    };
};

export const nearDoubles = () => {
    const number = Math.floor(Math.random() * 15) + 5;
    const adjust = Math.random() > 0.5 ? 1 : -1;
    
    const questions = [
        {
            q: `${number} + ${number + adjust} = ?`,
            tip: `This is a near double! Think: double ${number} is ${number * 2}, then adjust by ${adjust}`
        },
        {
            q: `What is ${number} + ${number + adjust}?`,
            tip: `Double ${number} = ${number * 2}, then ${adjust > 0 ? 'add' : 'subtract'} 1`
        }
    ];
    
    const selected = questions[Math.floor(Math.random() * questions.length)];

    return {
        question: selected.q,
        answer: number + (number + adjust),
        category: "Mental Math",
        skill: "Near doubles",
        tip: selected.tip,
        inputType: "number"
    };
};

// Export all generators for this category
export default {
    multiplicationAsRepeatedAddition,
    doublingNumbers,
    halvingNumbers,
    addingTens,
    subtractingTens,
    countingInMultiples,
    nearDoubles
};