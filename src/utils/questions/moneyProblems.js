// Money Problem Question Generators

const NAMES = ["Ben", "Amy", "Leo", "Eva", "Max", "Isla", "Sam", "Ella", "Tom", "Zara", "Jake", "Sophie"];

const SHOP_ITEMS = [
    { name: "toy car", prices: [35, 45, 55, 65, 75] },
    { name: "book", prices: [25, 40, 50, 75, 85] },
    { name: "puzzle", prices: [30, 45, 60, 80, 90] },
    { name: "ball", prices: [20, 35, 50, 70, 80] },
    { name: "game", prices: [40, 55, 70, 85, 95] },
    { name: "doll", prices: [45, 60, 75, 90, 100] },
    { name: "lego set", prices: [50, 65, 80, 95, 110] },
    { name: "art kit", prices: [30, 40, 55, 70, 85] },
    { name: "board game", prices: [35, 50, 65, 80, 95] },
    { name: "sticker book", prices: [15, 25, 35, 45, 55] }
];

export const moneyChangeProblem = () => {
    const item = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
    const price = item.prices[Math.floor(Math.random() * item.prices.length)];
    const paid = Math.ceil(price / 10) * 10 + (Math.random() > 0.5 ? 10 : 20);
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];

    return {
        question: `${name} buys a ${item.name} that costs ${price}p. ${name} pays with ${paid}p. How much change does ${name} get?`,
        answer: paid - price,
        category: "Money Problems",
        skill: "Calculating change",
        tip: "Change = Money given - Cost of item",
        inputType: "number"
    };
};

export const totalCostProblem = () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const numItems = Math.random() > 0.5 ? 2 : 3;
    const items = [];
    let total = 0;
    
    for (let i = 0; i < numItems; i++) {
        const item = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
        const price = item.prices[0] + Math.floor(Math.random() * 30);
        items.push({ name: item.name, price });
        total += price;
    }
    
    const itemList = items.map((item, index) => {
        if (index === items.length - 1 && items.length > 1) {
            return `and a ${item.name} for ${item.price}p`;
        }
        return `a ${item.name} for ${item.price}p`;
    }).join(', ');

    return {
        question: `${name} buys ${itemList}. How much does ${name} spend in total?`,
        answer: total,
        category: "Money Problems",
        skill: "Adding money amounts",
        tip: "Add all the prices together to find the total",
        inputType: "number"
    };
};

export const savingMoneyProblem = () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const saved = Math.floor(Math.random() * 40) + 20;
    const earned = Math.floor(Math.random() * 30) + 15;
    
    const scenarios = [
        {
            q: `${name} has saved ${saved}p. ${name} earns ${earned}p by helping at home. How much money does ${name} have now?`,
            a: saved + earned
        },
        {
            q: `${name} wants to save 100p. ${name} already has ${saved}p. How much more does ${name} need to save?`,
            a: 100 - saved
        }
    ];
    
    const selected = scenarios[Math.floor(Math.random() * scenarios.length)];

    return {
        question: selected.q,
        answer: selected.a,
        category: "Money Problems",
        skill: "Money calculations",
        tip: "Think about whether you need to add or subtract",
        inputType: "number"
    };
};

// Export all generators for this category
const moneyProblemsGenerators = {
    moneyChangeProblem,
    totalCostProblem,
    savingMoneyProblem
};

export default moneyProblemsGenerators;