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

// Combine all generators into a single object
export const questionGenerators = {
    // Word Problems
    ...wordProblems,
    
    // Money Problems
    ...moneyProblems,
    
    // Number Patterns
    ...numberPatterns,
    
    // Place Value
    ...placeValue,
    
    // Shapes
    ...shapes,
    
    // Measurement
    ...measurement,
    
    // Number Bonds
    ...numberBonds,

    // Mental Math
    ...mentalMath,

    // Fractions
    ...fractions
};

// Category mappings for focus modes
export const categoryGenerators = {
    wordProblems: Object.keys(wordProblems),
    moneyProblems: Object.keys(moneyProblems),
    patterns: Object.keys(numberPatterns),
    placeValue: Object.keys(placeValue),
    shapes: Object.keys(shapes),
    measurement: Object.keys(measurement),
    numberBonds: Object.keys(numberBonds),
    mentalMath: Object.keys(mentalMath),
    fractions: Object.keys(fractions)
};

// Get generators for a specific focus mode
export const getGeneratorsForFocusMode = (focusMode) => {
    switch (focusMode) {
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
        default:
            // Return all generators for 'all' mode
            return Object.keys(questionGenerators);
    }
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
    fractions
};