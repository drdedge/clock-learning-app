// Place Value Question Generators

export const tensAndOnes = () => {
    const number = Math.floor(Math.random() * 90) + 10;
    const tens = Math.floor(number / 10);
    const ones = number % 10;

    const questions = [
        { q: `In the number ${number}, what digit is in the tens place?`, a: tens },
        { q: `In the number ${number}, what digit is in the ones place?`, a: ones },
        { q: `How many tens are in ${number}?`, a: tens },
        { q: `The number ${number} has ${tens} tens and how many ones?`, a: ones },
        { q: `What is ${tens} tens and ${ones} ones?`, a: number }
    ];

    const selected = questions[Math.floor(Math.random() * questions.length)];

    return {
        question: selected.q,
        answer: selected.a,
        category: "Place Value",
        skill: "Understanding tens and ones",
        tip: "Remember: The first digit shows tens, the second shows ones!",
        inputType: "number"
    };
};

export const expandedForm = () => {
    const number = Math.floor(Math.random() * 90) + 10;
    const tens = Math.floor(number / 10);
    const ones = number % 10;

    const questions = [
        {
            q: `Write ${number} in expanded form: ___ + ___. What goes in the first blank?`,
            a: tens * 10,
            tip: "Expanded form shows the value of each digit"
        },
        {
            q: `${tens * 10} + ${ones} = ?`,
            a: number,
            tip: "Add the tens value and ones value together"
        },
        {
            q: `What is ${number} - ${ones}?`,
            a: tens * 10,
            tip: "This gives you just the tens value"
        }
    ];

    const selected = questions[Math.floor(Math.random() * questions.length)];

    return {
        question: selected.q,
        answer: selected.a,
        category: "Place Value",
        skill: "Expanded form",
        tip: selected.tip,
        inputType: "number"
    };
};

export const comparingNumbers = () => {
    const num1 = Math.floor(Math.random() * 90) + 10;
    const num2 = Math.floor(Math.random() * 90) + 10;
    
    // Ensure numbers are different
    if (num1 === num2) {
        num2 = num1 + Math.floor(Math.random() * 10) + 1;
    }

    const questions = [
        {
            q: `Which is greater: ${num1} or ${num2}?`,
            a: Math.max(num1, num2),
            tip: "Compare the tens first, then the ones"
        },
        {
            q: `Which is smaller: ${num1} or ${num2}?`,
            a: Math.min(num1, num2),
            tip: "The smaller number has fewer tens or ones"
        },
        {
            q: `Order these from smallest to largest: ${num2}, ${num1}. What comes first?`,
            a: Math.min(num1, num2),
            tip: "Start with the smallest number"
        }
    ];

    const selected = questions[Math.floor(Math.random() * questions.length)];

    return {
        question: selected.q,
        answer: selected.a,
        category: "Place Value",
        skill: "Comparing numbers",
        tip: selected.tip,
        inputType: "number"
    };
};

export const roundingNumbers = () => {
    const number = Math.floor(Math.random() * 90) + 10;
    const ones = number % 10;
    const roundedToTen = ones >= 5 ? Math.ceil(number / 10) * 10 : Math.floor(number / 10) * 10;

    return {
        question: `Round ${number} to the nearest ten.`,
        answer: roundedToTen,
        category: "Place Value",
        skill: "Rounding to nearest 10",
        tip: "If the ones digit is 5 or more, round up. If it's 4 or less, round down.",
        inputType: "number"
    };
};

// Export all generators for this category
export default {
    tensAndOnes,
    expandedForm,
    comparingNumbers,
    roundingNumbers
};