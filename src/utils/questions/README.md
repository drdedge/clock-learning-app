# Adding New Question Types to 7+ Math Practice

This guide explains how to add new question types to the modular question system.

## File Structure

```
src/utils/questions/
├── index.js              # Main export file
├── wordProblems.js       # Word problem generators
├── moneyProblems.js      # Money-related questions
├── numberPatterns.js     # Pattern and sequence questions
├── placeValue.js         # Place value questions
├── shapes.js             # Shape-related questions
├── measurement.js        # Measurement questions
├── numberBonds.js        # Number bond questions
├── mentalMath.js         # Mental math strategies
└── README.md            # This file
```

## Adding a New Question Generator

### 1. Create or Update a Category File

Each question generator should return an object with these properties:

```javascript
{
    question: "The question text",
    answer: 42,                          // For number inputs
    // OR
    answer: 2,                           // Index for multiple choice
    options: ["A", "B", "C", "D"],      // For multiple choice
    correctAnswer: "C",                  // For multiple choice display
    
    category: "Category Name",           // e.g., "Word Problems"
    skill: "Specific Skill",            // e.g., "Addition Story Problems"
    tip: "Helpful hint for wrong answers",
    inputType: "number" | "multiple-choice"
}
```

### 2. Example: Adding a Division Problem

Create a new function in `mentalMath.js`:

```javascript
export const simpleDivision = () => {
    const divisor = Math.floor(Math.random() * 5) + 2; // 2-6
    const quotient = Math.floor(Math.random() * 10) + 3; // 3-12
    const dividend = divisor * quotient;
    
    const contexts = [
        `${dividend} ÷ ${divisor} = ?`,
        `If ${dividend} cookies are shared equally among ${divisor} children, how many does each child get?`,
        `A pack of ${dividend} stickers is divided into ${divisor} equal groups. How many in each group?`
    ];
    
    return {
        question: contexts[Math.floor(Math.random() * contexts.length)],
        answer: quotient,
        category: "Mental Math",
        skill: "Division facts",
        tip: `Think: What times ${divisor} equals ${dividend}?`,
        inputType: "number"
    };
};
```

### 3. Export the New Generator

Add to the default export in the same file:

```javascript
export default {
    // ... existing exports
    simpleDivision
};
```

### 4. Update Focus Mode Categories

In `src/utils/questions/index.js`, update the category mappings if needed:

```javascript
export const getGeneratorsForFocusMode = (focusMode) => {
    switch (focusMode) {
        // ... existing cases
        case 'mentalMath':
            return [...categoryGenerators.mentalMath]; // Already includes new generator
        // ...
    }
};
```

## Creating a New Category

### 1. Create a New File

Create `src/utils/questions/fractions.js`:

```javascript
export const simpleFractions = () => {
    // Your generator logic
};

export const comparingFractions = () => {
    // Your generator logic
};

export default {
    simpleFractions,
    comparingFractions
};
```

### 2. Update the Index File

In `src/utils/questions/index.js`:

```javascript
import fractions from './fractions';

export const questionGenerators = {
    // ... existing imports
    ...fractions
};

export const categoryGenerators = {
    // ... existing categories
    fractions: Object.keys(fractions)
};
```

### 3. Add Focus Mode Option

Update `getGeneratorsForFocusMode`:

```javascript
case 'fractions':
    return categoryGenerators.fractions;
```

### 4. Update the UI

In `SevenPlusQuizApp.js`, add the option to the select dropdown:

```javascript
<option value="fractions">Fractions</option>
```

## Best Practices

1. **Randomization**: Use helper functions for generating unique numbers
2. **Difficulty**: Keep problems appropriate for 7+ age group
3. **Context**: Use real-world scenarios when possible
4. **Tips**: Provide helpful hints that teach strategies
5. **Validation**: Ensure answers are always integers for number inputs

## Testing Your Questions

1. Add your new generator to an existing category file
2. Run the app and select the appropriate focus mode
3. Verify questions display correctly
4. Check that answers validate properly
5. Ensure tips are helpful and age-appropriate