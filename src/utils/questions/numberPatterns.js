// Number Pattern Question Generators

export const constantAddition = () => {
    const start = Math.floor(Math.random() * 20) + 5;
    const step = Math.floor(Math.random() * 10) + 2;
    const sequence = [start];
    for (let i = 1; i < 5; i++) {
        sequence.push(sequence[i - 1] + step);
    }
    return {
        question: `What comes next in this pattern? ${sequence.join(', ')}, ?`,
        answer: sequence[4] + step,
        category: "Patterns",
        skill: "Number sequences",
        tip: `Add ${step} each time`,
        inputType: "number"
    };
};

export const constantSubtraction = () => {
    const start = Math.floor(Math.random() * 30) + 70;
    const step = Math.floor(Math.random() * 8) + 3;
    const sequence = [start];
    for (let i = 1; i < 5; i++) {
        sequence.push(sequence[i - 1] - step);
    }
    return {
        question: `What comes next in this pattern? ${sequence.join(', ')}, ?`,
        answer: sequence[4] - step,
        category: "Patterns",
        skill: "Number sequences",
        tip: `Subtract ${step} each time`,
        inputType: "number"
    };
};

export const alternatingPattern = () => {
    const num1 = Math.floor(Math.random() * 20) + 10;
    const num2 = Math.floor(Math.random() * 20) + 30;
    const sequence = [num1, num2, num1, num2, num1];
    return {
        question: `What comes next in this pattern? ${sequence.join(', ')}, ?`,
        answer: num2,
        category: "Patterns",
        skill: "Number sequences",
        tip: `Alternates between ${num1} and ${num2}`,
        inputType: "number"
    };
};

export const incrementingAddition = () => {
    const start = Math.floor(Math.random() * 10) + 5;
    const sequence = [start, start + 1];
    sequence.push(sequence[1] + 2);
    sequence.push(sequence[2] + 3);
    sequence.push(sequence[3] + 4);
    return {
        question: `What comes next in this pattern? ${sequence.join(', ')}, ?`,
        answer: sequence[4] + 5,
        category: "Patterns",
        skill: "Number sequences",
        tip: "Add 1, then 2, then 3, then 4...",
        inputType: "number"
    };
};

export const doublingPattern = () => {
    const start = Math.floor(Math.random() * 5) + 2;
    const sequence = [start];
    for (let i = 1; i < 5; i++) {
        sequence.push(sequence[i - 1] * 2);
    }
    return {
        question: `What comes next in this pattern? ${sequence.join(', ')}, ?`,
        answer: sequence[4] * 2,
        category: "Patterns",
        skill: "Number sequences",
        tip: "Double each time",
        inputType: "number"
    };
};

export const fibonacciLikePattern = () => {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const sequence = [a, b, a + b];
    sequence.push(sequence[1] + sequence[2]);
    sequence.push(sequence[2] + sequence[3]);
    return {
        question: `What comes next in this pattern? ${sequence.join(', ')}, ?`,
        answer: sequence[3] + sequence[4],
        category: "Patterns",
        skill: "Number sequences",
        tip: "Add the two previous numbers",
        inputType: "number"
    };
};

export const skipCountingPattern = () => {
    const starts = [2, 5, 10];
    const start = starts[Math.floor(Math.random() * starts.length)];
    const multiplier = Math.floor(Math.random() * 10) + 1;
    const sequence = [];
    for (let i = 0; i < 5; i++) {
        sequence.push(start * (multiplier + i));
    }
    return {
        question: `What comes next in this pattern? ${sequence.join(', ')}, ?`,
        answer: start * (multiplier + 5),
        category: "Patterns",
        skill: "Skip counting",
        tip: `Count by ${start}s`,
        inputType: "number"
    };
};

// Export all generators for this category
export default {
    constantAddition,
    constantSubtraction,
    alternatingPattern,
    incrementingAddition,
    doublingPattern,
    fibonacciLikePattern,
    skipCountingPattern
};