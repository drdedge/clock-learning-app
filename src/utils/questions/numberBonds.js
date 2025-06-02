// Number Bonds Question Generators

const CONTEXTS_20 = [
    "I have {first} red marbles. How many blue marbles do I need to make 20 marbles altogether?",
    "There are {first} children in the hall. How many more children need to come to make 20 children?",
    "{first} birds are in the tree. How many more birds need to land to make 20 birds?",
    "A book has 20 pages. I've read {first} pages. How many pages are left?",
    "I need 20 stickers to fill my chart. I have {first} stickers. How many more do I need?",
    "There are {first} flowers in the vase. How many more flowers do I need to have 20 in total?"
];

const CONTEXTS_50 = [
    "The parking lot can hold 50 cars. There are {first} cars parked. How many more spaces are available?",
    "I'm collecting 50 stamps. I have {first} stamps so far. How many more do I need?",
    "The bus can carry 50 passengers. {first} people are on the bus. How many more can get on?",
    "I need 50 points to win the game. I have {first} points. How many more points do I need?",
    "The jar can hold 50 marbles. There are {first} marbles in it. How many more can fit?"
];

const CONTEXTS_100 = [
    "I'm saving up 100p for a toy. I have {first}p. How much more do I need to save?",
    "The puzzle has 100 pieces. I've placed {first} pieces. How many pieces are left?",
    "Our class goal is to read 100 books. We've read {first} books. How many more do we need to read?",
    "The treasure chest can hold 100 coins. There are {first} coins in it. How many more coins can fit?",
    "I need to collect 100 stars. I have {first} stars. How many more stars do I need?"
];

export const numberBondsTo20 = () => {
    const first = Math.floor(Math.random() * 16) + 3; // 3 to 18
    const second = 20 - first;
    const context = CONTEXTS_20[Math.floor(Math.random() * CONTEXTS_20.length)];

    return {
        question: context.replace('{first}', first),
        answer: second,
        category: "Number Bonds",
        skill: "Number bonds to 20",
        tip: `Think: ${first} + ? = 20`,
        inputType: "number"
    };
};

export const numberBondsTo50 = () => {
    const first = Math.floor(Math.random() * 41) + 5; // 5 to 45
    const second = 50 - first;
    const context = CONTEXTS_50[Math.floor(Math.random() * CONTEXTS_50.length)];

    return {
        question: context.replace('{first}', first),
        answer: second,
        category: "Number Bonds",
        skill: "Number bonds to 50",
        tip: `Think: ${first} + ? = 50`,
        inputType: "number"
    };
};

export const numberBondsTo100 = () => {
    const first = Math.floor(Math.random() * 81) + 10; // 10 to 90
    const second = 100 - first;
    const context = CONTEXTS_100[Math.floor(Math.random() * CONTEXTS_100.length)];

    return {
        question: context.replace('{first}', first),
        answer: second,
        category: "Number Bonds",
        skill: "Number bonds to 100",
        tip: `Think: ${first} + ? = 100`,
        inputType: "number"
    };
};

export const numberBondsTo10 = () => {
    const first = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const second = 10 - first;
    
    const contexts = [
        `${first} + ? = 10`,
        `I have ${first} fingers up. How many fingers are down?`,
        `There are ${first} dots on one side of the domino. How many dots are on the other side to make 10?`,
        `${first} children are sitting. How many more need to sit to make 10 children?`
    ];
    
    const context = contexts[Math.floor(Math.random() * contexts.length)];

    return {
        question: context,
        answer: second,
        category: "Number Bonds",
        skill: "Number bonds to 10",
        tip: `10 - ${first} = ${second}`,
        inputType: "number"
    };
};

export const missingNumber = () => {
    const targets = [10, 20, 50, 100];
    const target = targets[Math.floor(Math.random() * targets.length)];
    
    let first, second;
    if (target === 10) {
        first = Math.floor(Math.random() * 8) + 1;
    } else if (target === 20) {
        first = Math.floor(Math.random() * 16) + 3;
    } else if (target === 50) {
        first = Math.floor(Math.random() * 41) + 5;
    } else {
        first = Math.floor(Math.random() * 81) + 10;
    }
    
    second = target - first;
    
    const formats = [
        `${first} + ___ = ${target}`,
        `___ + ${second} = ${target}`,
        `${target} = ${first} + ___`,
        `${target} = ___ + ${second}`
    ];
    
    const format = formats[Math.floor(Math.random() * formats.length)];
    const answer = format.includes(first.toString()) ? second : first;

    return {
        question: `Fill in the missing number: ${format}`,
        answer: answer,
        category: "Number Bonds",
        skill: `Missing numbers to ${target}`,
        tip: `What number makes the equation true?`,
        inputType: "number"
    };
};

// Export all generators for this category
export default {
    numberBondsTo10,
    numberBondsTo20,
    numberBondsTo50,
    numberBondsTo100,
    missingNumber
};