// Central export for all question generators
import wordProblems from './wordProblems';
import moneyProblems from './moneyProblems';
import numberPatterns from './numberPatterns';
import placeValue from './placeValue';
import shapes from './shapes';
import measurement from './measurement';
import numberBonds from './numberBonds';
import mentalMath from './mentalMath';
import fractions from './fractions';
import clockTime from './clockTime';
import shapes2D3D from './shapes2D3D';
import symbolAlgebra from './symbolAlgebra';
import graphs from './graphs';
import unitConversions from './unitConversions';
import everydayComparisons from './everydayComparisons';

// Combine all generators into a single object
export const questionGenerators = {
    // Original categories
    ...wordProblems,
    ...moneyProblems,
    ...numberPatterns,
    ...placeValue,
    ...shapes,
    ...measurement,
    ...numberBonds,
    ...mentalMath,
    ...fractions,
    
    // New 7+ categories
    ...clockTime,
    ...shapes2D3D,
    ...symbolAlgebra,
    ...graphs,
    ...unitConversions,
    ...everydayComparisons
};

// Category mappings for focus modes
export const categoryGenerators = {
    wordProblems: Object.keys(wordProblems),
    moneyProblems: Object.keys(moneyProblems),
    patterns: Object.keys(numberPatterns),
    placeValue: Object.keys(placeValue),
    shapes: [...Object.keys(shapes), ...Object.keys(shapes2D3D)],
    measurement: [...Object.keys(measurement), ...Object.keys(unitConversions)],
    numberBonds: Object.keys(numberBonds),
    mentalMath: Object.keys(mentalMath),
    fractions: Object.keys(fractions),
    time: Object.keys(clockTime),
    algebra: Object.keys(symbolAlgebra),
    graphs: Object.keys(graphs),
    realWorld: Object.keys(everydayComparisons)
};

// Dynamic Question Bank System
class DynamicQuestionBank {
    constructor() {
        this.usedQuestions = new Set();
        this.questionHistory = [];
        this.maxHistorySize = 50;
        this.difficulty = 'easy'; // Current difficulty level
        this.consecutiveCorrect = 0;
        this.consecutiveIncorrect = 0;
        this.correctTimes = []; // Track recent correct answer times
    }

    reset() {
        this.usedQuestions.clear();
        this.questionHistory = [];
        // Don't reset difficulty tracking - preserve across quiz resets
    }

    resetDifficulty() {
        this.difficulty = 'easy';
        this.consecutiveCorrect = 0;
        this.consecutiveIncorrect = 0;
        this.correctTimes = [];
    }

    updateDifficulty(wasCorrect, timeSpent) {
        if (wasCorrect) {
            this.consecutiveCorrect++;
            this.consecutiveIncorrect = 0;
            this.correctTimes.push(timeSpent);

            // Keep only the last 3 times for evaluation
            if (this.correctTimes.length > 3) {
                this.correctTimes.shift();
            }

            // Increase difficulty after 3 consecutive correct answers in < 10 seconds each
            if (this.consecutiveCorrect >= 3 && this.correctTimes.length >= 3) {
                const allFast = this.correctTimes.every(time => time < 10);

                if (allFast) {
                    if (this.difficulty === 'easy') {
                        this.difficulty = 'medium';
                        this.consecutiveCorrect = 0;
                        this.correctTimes = [];
                    } else if (this.difficulty === 'medium') {
                        this.difficulty = 'hard';
                        this.consecutiveCorrect = 0;
                        this.correctTimes = [];
                    }
                }
            }
        } else {
            this.consecutiveIncorrect++;
            this.consecutiveCorrect = 0;
            this.correctTimes = [];

            // Decrease difficulty after 2 consecutive wrong answers
            if (this.consecutiveIncorrect >= 2) {
                if (this.difficulty === 'hard') {
                    this.difficulty = 'medium';
                    this.consecutiveIncorrect = 0;
                } else if (this.difficulty === 'medium') {
                    this.difficulty = 'easy';
                    this.consecutiveIncorrect = 0;
                }
            }
        }

        return this.difficulty;
    }

    getDifficulty() {
        return this.difficulty;
    }
    
    generateUniqueQuestion(generatorNames, maxAttempts = 10, difficulty = null) {
        // Use provided difficulty or the current difficulty level
        const currentDifficulty = difficulty || this.difficulty;

        // Filter out any generators that have been exhausted
        const availableGenerators = generatorNames.filter(name =>
            questionGenerators[name] && typeof questionGenerators[name] === 'function'
        );

        if (availableGenerators.length === 0) {
            console.error('No valid generators available');
            return null;
        }

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            // Randomly select a generator
            const generatorName = availableGenerators[Math.floor(Math.random() * availableGenerators.length)];
            const generator = questionGenerators[generatorName];

            try {
                // Try to pass difficulty to the generator
                // Generators that don't support difficulty will ignore it
                const question = generator(currentDifficulty);

                // Create a unique key for the question
                const questionKey = JSON.stringify({
                    q: question.question,
                    a: question.answer
                });

                // Check if we've used this exact question before
                if (!this.usedQuestions.has(questionKey)) {
                    this.usedQuestions.add(questionKey);
                    this.questionHistory.push(questionKey);

                    // Maintain history size limit
                    if (this.questionHistory.length > this.maxHistorySize) {
                        const oldKey = this.questionHistory.shift();
                        this.usedQuestions.delete(oldKey);
                    }

                    // Add difficulty metadata to question
                    question.difficultyLevel = currentDifficulty;

                    return question;
                }
            } catch (error) {
                console.error(`Error generating question with ${generatorName}:`, error);
            }
        }

        // If we couldn't find a unique question, reset and try again
        if (this.questionHistory.length > 20) {
            this.reset();
            return this.generateUniqueQuestion(generatorNames, 1, currentDifficulty);
        }

        return null;
    }
    
    generateQuestionSet(generatorNames, count = 20, difficulty = null) {
        const questions = [];
        const bank = new DynamicQuestionBank();

        for (let i = 0; i < count; i++) {
            const question = bank.generateUniqueQuestion(generatorNames, 10, difficulty);
            if (question) {
                questions.push(question);
            }
        }

        return questions;
    }
}

// Export a singleton instance
export const questionBank = new DynamicQuestionBank();

// Get generators for a specific focus mode
export const getGeneratorsForFocusMode = (focusMode) => {
    switch (focusMode) {
        // Original focus modes
        case 'wordProblems':
            return [...categoryGenerators.wordProblems, ...categoryGenerators.moneyProblems];
        case 'numberBonds':
            return categoryGenerators.numberBonds;
        case 'placeValue':
            return categoryGenerators.placeValue;
        case 'patterns':
            return categoryGenerators.patterns;
        case 'shapes':
            return categoryGenerators.shapes;
        case 'measurement':
            return categoryGenerators.measurement;
        case 'money':
            return categoryGenerators.moneyProblems;
        case 'mentalMath':
            return categoryGenerators.mentalMath;
        case 'fractions':
            return categoryGenerators.fractions;
            
        // New 7+ focus modes
        case 'time':
            return categoryGenerators.time;
        case 'algebra':
            return categoryGenerators.algebra;
        case 'graphs':
            return categoryGenerators.graphs;
        case 'realWorld':
            return categoryGenerators.realWorld;
        case 'advanced':
            // Advanced mode combines algebra, complex word problems, and graphs
            return [
                ...categoryGenerators.algebra,
                ...categoryGenerators.graphs,
                'generateComplexWordProblems',
                'generateTimeWordProblem',
                'generateScheduleProblem'
            ];
        case '7plus':
            // Special 7+ mode with all advanced topics
            return [
                ...categoryGenerators.time,
                ...categoryGenerators.algebra,
                ...categoryGenerators.graphs,
                ...categoryGenerators.shapes,
                ...categoryGenerators.measurement,
                ...categoryGenerators.realWorld
            ];
        default:
            // Return all generators for 'all' mode
            return Object.keys(questionGenerators);
    }
};

// Helper function to generate a quiz with no repetition
export const generateDynamicQuiz = (focusMode = 'all', questionCount = 20, difficulty = null) => {
    const generators = getGeneratorsForFocusMode(focusMode);
    return questionBank.generateQuestionSet(generators, questionCount, difficulty);
};

// Export individual category modules for direct access if needed
export {
    wordProblems,
    moneyProblems,
    numberPatterns,
    placeValue,
    shapes,
    measurement,
    numberBonds,
    mentalMath,
    fractions,
    clockTime,
    shapes2D3D,
    symbolAlgebra,
    graphs,
    unitConversions,
    everydayComparisons
};