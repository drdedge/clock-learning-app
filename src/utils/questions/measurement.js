// Measurement Question Generators

const OBJECTS = [
    { name: "door", correct: "200cm", options: ["2cm", "20cm", "200cm", "20m"], category: "length" },
    { name: "pencil", correct: "15cm", options: ["15mm", "15cm", "15m", "150cm"], category: "length" },
    { name: "car", correct: "4m", options: ["40cm", "4m", "40m", "400m"], category: "length" },
    { name: "book", correct: "30cm", options: ["3cm", "30cm", "3m", "30m"], category: "length" },
    { name: "table", correct: "1m", options: ["10cm", "1m", "10m", "100m"], category: "length" },
    { name: "ant", correct: "5mm", options: ["5mm", "5cm", "5m", "50cm"], category: "length" },
    { name: "tree", correct: "10m", options: ["10cm", "1m", "10m", "100m"], category: "length" },
    { name: "finger", correct: "7cm", options: ["7mm", "7cm", "70cm", "7m"], category: "length" },
    { name: "classroom", correct: "8m", options: ["80cm", "8m", "80m", "800m"], category: "length" },
    { name: "paperclip", correct: "3cm", options: ["3mm", "3cm", "30cm", "3m"], category: "length" }
];

const TIME_ACTIVITIES = [
    { activity: "brushing teeth", correct: "2 minutes", options: ["2 seconds", "2 minutes", "2 hours", "20 minutes"] },
    { activity: "sleeping at night", correct: "8 hours", options: ["8 minutes", "80 minutes", "8 hours", "80 hours"] },
    { activity: "eating lunch", correct: "30 minutes", options: ["3 minutes", "30 minutes", "3 hours", "30 hours"] },
    { activity: "watching a movie", correct: "2 hours", options: ["20 minutes", "2 hours", "20 hours", "200 minutes"] },
    { activity: "blinking your eyes", correct: "1 second", options: ["1 second", "1 minute", "10 seconds", "1 hour"] },
    { activity: "school day", correct: "6 hours", options: ["60 minutes", "6 hours", "60 hours", "600 minutes"] }
];

const MASS_OBJECTS = [
    { name: "apple", correct: "200g", options: ["2g", "20g", "200g", "2kg"] },
    { name: "bag of flour", correct: "1kg", options: ["10g", "100g", "1kg", "10kg"] },
    { name: "pencil", correct: "10g", options: ["1g", "10g", "100g", "1kg"] },
    { name: "child", correct: "30kg", options: ["3kg", "30kg", "300kg", "3000kg"] },
    { name: "feather", correct: "1g", options: ["1g", "10g", "100g", "1kg"] }
];

export const measurementComparison = () => {
    const object = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];

    return {
        question: `How tall/long is a typical ${object.name}?`,
        answer: object.options.indexOf(object.correct),
        options: object.options,
        correctAnswer: object.correct,
        category: "Measurement",
        skill: "Understanding real-world measurements",
        tip: "Think about the size: mm is tiny, cm is small, m is big!",
        inputType: "multiple-choice"
    };
};

export const timeEstimation = () => {
    const activity = TIME_ACTIVITIES[Math.floor(Math.random() * TIME_ACTIVITIES.length)];

    return {
        question: `How long does ${activity.activity} usually take?`,
        answer: activity.options.indexOf(activity.correct),
        options: activity.options,
        correctAnswer: activity.correct,
        category: "Measurement",
        skill: "Time estimation",
        tip: "Think about your daily activities and how long they take!",
        inputType: "multiple-choice"
    };
};

export const massComparison = () => {
    const object = MASS_OBJECTS[Math.floor(Math.random() * MASS_OBJECTS.length)];

    return {
        question: `How heavy is a typical ${object.name}?`,
        answer: object.options.indexOf(object.correct),
        options: object.options,
        correctAnswer: object.correct,
        category: "Measurement",
        skill: "Understanding mass/weight",
        tip: "Remember: 1000g = 1kg. Think about what you can hold easily!",
        inputType: "multiple-choice"
    };
};

export const unitConversion = () => {
    const conversions = [
        { q: "How many centimeters are in 1 meter?", a: 100, tip: "1m = 100cm" },
        { q: "How many millimeters are in 1 centimeter?", a: 10, tip: "1cm = 10mm" },
        { q: "How many minutes are in 1 hour?", a: 60, tip: "1 hour = 60 minutes" },
        { q: "How many seconds are in 1 minute?", a: 60, tip: "1 minute = 60 seconds" },
        { q: "How many grams are in 1 kilogram?", a: 1000, tip: "1kg = 1000g" },
        { q: "How many centimeters are in 50mm?", a: 5, tip: "10mm = 1cm, so divide by 10" },
        { q: "How many meters are in 300cm?", a: 3, tip: "100cm = 1m, so divide by 100" }
    ];

    const selected = conversions[Math.floor(Math.random() * conversions.length)];

    return {
        question: selected.q,
        answer: selected.a,
        category: "Measurement",
        skill: "Unit conversion",
        tip: selected.tip,
        inputType: "number"
    };
};

export const centimetersInMeters = () => {
    const meters = Math.floor(Math.random() * 9) + 2; // 2-10m

    return {
        question: `How many centimeters are in ${meters} meters?`,
        answer: meters * 100,
        category: "Measurement",
        skill: "Unit conversion",
        tip: "Multiply the meters by 100 to get centimeters",
        inputType: "number"
    };
};

export const metersInKilometers = () => {
    const km = Math.floor(Math.random() * 9) + 1; // 1-9km

    return {
        question: `How many meters are in ${km} kilometers?`,
        answer: km * 1000,
        category: "Measurement",
        skill: "Unit conversion",
        tip: "1km = 1000m",
        inputType: "number"
    };
};

export const comparingMeasurements = () => {
    const comparisons = [
        {
            q: "Which is longer: 50cm or 1m?",
            options: ["50cm", "1m", "They are equal", "Cannot compare"],
            answer: 1,
            correctAnswer: "1m",
            tip: "Convert to the same unit: 1m = 100cm"
        },
        {
            q: "Which is heavier: 2000g or 3kg?",
            options: ["2000g", "3kg", "They are equal", "Cannot compare"],
            answer: 1,
            correctAnswer: "3kg",
            tip: "Convert to the same unit: 1kg = 1000g"
        },
        {
            q: "Which is shorter: 120 seconds or 2 minutes?",
            options: ["120 seconds", "2 minutes", "They are equal", "Cannot compare"],
            answer: 2,
            correctAnswer: "They are equal",
            tip: "2 minutes = 120 seconds"
        }
    ];

    const selected = comparisons[Math.floor(Math.random() * comparisons.length)];

    return {
        question: selected.q,
        answer: selected.answer,
        options: selected.options,
        correctAnswer: selected.correctAnswer,
        category: "Measurement",
        skill: "Comparing measurements",
        tip: selected.tip,
        inputType: "multiple-choice"
    };
};

// Export all generators for this category
const measurementGenerators = {
    measurementComparison,
    timeEstimation,
    massComparison,
    unitConversion,
    centimetersInMeters,
    metersInKilometers,
    comparingMeasurements
};

export default measurementGenerators;