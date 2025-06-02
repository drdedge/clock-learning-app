// Word Problem Question Generators

// Helper function to generate unique random numbers
const generateUniqueNumbers = (count, min, max) => {
    const numbers = [];
    while (numbers.length < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
};

// Configuration for scenarios
const SCENARIOS = {
    addition: [
        { context: "in the toy shop", items: ["teddy bears", "dolls", "cars", "blocks", "puzzles"] },
        { context: "on the farm", items: ["chickens", "cows", "sheep", "pigs", "ducks"] },
        { context: "in the garden", items: ["roses", "daisies", "tulips", "sunflowers", "daffodils"] },
        { context: "at the party", items: ["balloons", "cupcakes", "presents", "hats", "candles"] },
        { context: "in the classroom", items: ["pencils", "books", "crayons", "rulers", "erasers"] },
        { context: "at the beach", items: ["shells", "sandcastles", "starfish", "pebbles", "crabs"] },
        { context: "in the kitchen", items: ["apples", "cookies", "muffins", "oranges", "bananas"] }
    ],
    subtraction: [
        { action: "ate", items: ["apples", "cookies", "grapes", "strawberries", "cherries"] },
        { action: "gave away", items: ["stickers", "marbles", "cards", "sweets", "toys"] },
        { action: "sold", items: ["books", "flowers", "cakes", "drinks", "tickets"] },
        { action: "used", items: ["crayons", "stickers", "stamps", "papers", "ribbons"] },
        { action: "lost", items: ["buttons", "coins", "beads", "pins", "clips"] }
    ]
};

const NAMES = [
    "Emma", "Oliver", "Sophia", "James", "Ava", "William", "Isabella", "Benjamin",
    "Lily", "Noah", "Grace", "Ethan", "Chloe", "Lucas", "Mia", "Mason",
    "Sarah", "Tom", "Ruby", "Jack", "Alice", "Charlie", "Zoe", "Harry",
    "Ben", "Amy", "Leo", "Eva", "Max", "Isla", "Sam", "Ella"
];

export const simpleAdditionStory = () => {
    const scenario = SCENARIOS.addition[Math.floor(Math.random() * SCENARIOS.addition.length)];
    const item = scenario.items[Math.floor(Math.random() * scenario.items.length)];
    const [num1, num2] = generateUniqueNumbers(2, 10, 50);
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];

    return {
        question: `${name} has ${num1} ${item} ${scenario.context}. Then ${name} finds ${num2} more ${item}. How many ${item} does ${name} have altogether?`,
        answer: num1 + num2,
        category: "Word Problems",
        skill: "Addition Story Problems",
        tip: "Look for the words 'altogether' or 'in total' - they mean you need to add!",
        inputType: "number"
    };
};

export const subtractionStory = () => {
    const scenario = SCENARIOS.subtraction[Math.floor(Math.random() * SCENARIOS.subtraction.length)];
    const item = scenario.items[Math.floor(Math.random() * scenario.items.length)];
    const num1 = Math.floor(Math.random() * 50) + 30;
    const num2 = Math.floor(Math.random() * Math.min(num1 - 10, 30)) + 5;
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];

    return {
        question: `${name} had ${num1} ${item}. ${name} ${scenario.action} ${num2} of them. How many ${item} does ${name} have left?`,
        answer: num1 - num2,
        category: "Word Problems",
        skill: "Subtraction Story Problems",
        tip: "Words like 'left', 'remain', or actions like 'gave away' mean subtract!",
        inputType: "number"
    };
};

export const comparisonProblem = () => {
    const items = ["books", "marbles", "stickers", "cards", "stamps", "coins", "shells", "beads"];
    const item = items[Math.floor(Math.random() * items.length)];
    const [num1, num2] = generateUniqueNumbers(2, 20, 80).sort((a, b) => a - b);
    const difference = num2 - num1;
    const [name1, name2] = generateUniqueNumbers(2, 0, NAMES.length - 1).map(i => NAMES[i]);

    const questionTypes = [
        {
            q: `${name1} has ${num1} ${item}. ${name2} has ${num2} ${item}. How many more ${item} does ${name2} have than ${name1}?`,
            a: difference
        },
        {
            q: `${name1} collected ${num1} ${item}. ${name2} collected ${difference} more ${item} than ${name1}. How many ${item} did ${name2} collect?`,
            a: num2
        },
        {
            q: `${name2} has ${num2} ${item}. ${name1} has ${difference} fewer ${item} than ${name2}. How many ${item} does ${name1} have?`,
            a: num1
        }
    ];

    const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    return {
        question: selected.q,
        answer: selected.a,
        category: "Word Problems",
        skill: "Comparison Problems",
        tip: "'How many more' means find the difference between two numbers!",
        inputType: "number"
    };
};

// Export all generators for this category
const wordProblemsGenerators = {
    simpleAdditionStory,
    subtractionStory,
    comparisonProblem
};

export default wordProblemsGenerators;