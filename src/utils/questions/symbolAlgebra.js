const generateSymbolEquations = () => {
  const symbols = ["⭐", "🔺", "⚫", "🔷", "❤️", "🟢", "🟦", "🟪"];
  
  const symbol1 = symbols[0];
  const symbol2 = symbols[1];
  const symbol3 = symbols[2];
  
  const value1 = Math.floor(Math.random() * 5) + 3;
  const value2 = Math.floor(Math.random() * 5) + 4;
  const value3 = Math.floor(Math.random() * 5) + 2;
  
  const equation1 = `${symbol1} + ${symbol1} = ${value1 * 2}`;
  const equation2 = `${symbol1} + ${symbol2} + ${symbol2} = ${value1 + value2 * 2}`;
  const equation3 = `${symbol1} + ${symbol2} + ${symbol3} = ${value1 + value2 + value3}`;
  
  const answer = value1 + value2 * 2 + value3 + value2;
  
  return {
    question: `Each shape represents a whole number.\n• ${equation1}\n• ${equation2}\n• ${equation3}\n• ${symbol1} + ${symbol2} + ${symbol2} + ${symbol3} + ${symbol2} = ?`,
    answer: answer,
    category: "Algebra",
    skill: "Symbol Equations",
    tip: `First find ${symbol1} = ${value1}, then ${symbol2} = ${value2}, then ${symbol3} = ${value3}`,
    inputType: "number"
  };
};

const generateAnimalSymbols = () => {
  const animals = ["🦜", "🐘", "🦁", "🐸", "🦋", "🐢"];
  const fruits = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍑"];
  const objects = ["⚽", "🎈", "📚", "🎨", "🎮", "🎯"];
  
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const fruit = fruits[Math.floor(Math.random() * fruits.length)];
  const object = objects[Math.floor(Math.random() * objects.length)];
  
  const value1 = Math.floor(Math.random() * 4) + 4;
  const value2 = Math.floor(Math.random() * 4) + 5;
  const value3 = Math.floor(Math.random() * 4) + 3;
  
  const equations = [
    `${animal} + ${animal} = ${value1 * 2}`,
    `${animal} + ${fruit} + ${fruit} = ${value1 + value2 * 2}`,
    `${animal} + ${fruit} + ${object} = ${value1 + value2 + value3}`
  ];
  
  const combinations = [
    { expr: `${animal} + ${fruit} + ${fruit} + ${object} + ${fruit}`, ans: value1 + value2 * 3 + value3 },
    { expr: `${animal} + ${animal} + ${fruit} + ${object}`, ans: value1 * 2 + value2 + value3 },
    { expr: `${fruit} + ${fruit} + ${object} + ${object}`, ans: value2 * 2 + value3 * 2 }
  ];
  
  const selected = combinations[Math.floor(Math.random() * combinations.length)];
  
  return {
    question: `Each symbol represents a whole number.\n• ${equations[0]}\n• ${equations[1]}\n• ${equations[2]}\n• ${selected.expr} = ?`,
    answer: selected.ans,
    category: "Algebra",
    skill: "Symbol Algebra",
    tip: `Solve step by step: ${animal} = ${value1}, ${fruit} = ${value2}, ${object} = ${value3}`,
    inputType: "number"
  };
};

const generateBalanceEquations = () => {
  const left1 = Math.floor(Math.random() * 10) + 15;
  const right1 = left1;
  
  const x = Math.floor(Math.random() * 8) + 3;
  const left2 = x + Math.floor(Math.random() * 10) + 5;
  const right2 = left2;
  
  return {
    question: `If ${left1} = ${right1}, and ${x} + ? = ${right2}, what is the missing number?`,
    answer: right2 - x,
    category: "Algebra",
    skill: "Balance Equations",
    tip: `The equation must balance: ${x} + ? = ${right2}`,
    inputType: "number"
  };
};

const generateComplexWordProblems = () => {
  const problems = [
    {
      setup: () => {
        const total = Math.floor(Math.random() * 20) + 80;
        const given = Math.floor(Math.random() * 10) + 15;
        const lost = Math.floor(Math.random() * 10) + 10;
        const friends = Math.floor(Math.random() * 3) + 3;
        const remaining = total - given - lost;
        const each = Math.floor(remaining / (friends + 1));
        
        return {
          question: `Sarah had ${total} stickers. She gave away ${given} stickers and lost ${lost} stickers. She shared the remaining stickers equally among herself and ${friends} friends. How many stickers did each person get?`,
          answer: each,
          tip: `Remaining: ${total} - ${given} - ${lost} = ${remaining}. Divide by ${friends + 1} people`
        };
      }
    },
    {
      setup: () => {
        const rice = Math.floor(Math.random() * 5) + 4;
        const boxes = Math.floor(Math.random() * 3) + 3;
        const pastaWeight = Math.floor(Math.random() * 2) + 2;
        const total = rice + (boxes * pastaWeight);
        
        return {
          question: `A bag of rice and ${boxes} boxes of pasta weigh ${total} kg in total. If the bag of rice weighs ${rice} kg, how much does one box of pasta weigh?`,
          answer: pastaWeight,
          tip: `Total pasta weight: ${total} - ${rice} = ${total - rice} kg. Divide by ${boxes} boxes`
        };
      }
    },
    {
      setup: () => {
        const total = Math.floor(Math.random() * 20) + 60;
        const firstFraction = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
        const secondFraction = [2, 3, 4][Math.floor(Math.random() * 3)];
        const used1 = Math.floor(total / firstFraction);
        const remaining1 = total - used1;
        const used2 = Math.floor(remaining1 / secondFraction);
        const final = remaining1 - used2;
        
        return {
          question: `I have a bag of ${total} marbles. I give away 1/${firstFraction} of the marbles to my friend. I use 1/${secondFraction} of the marbles that are left for a game. How many marbles are left now?`,
          answer: final,
          tip: `First: ${total} ÷ ${firstFraction} = ${used1}. Left: ${remaining1}. Second: ${remaining1} ÷ ${secondFraction} = ${used2}`
        };
      }
    }
  ];
  
  const selected = problems[Math.floor(Math.random() * problems.length)];
  const problem = selected.setup();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Algebra",
    skill: "Complex Word Problems",
    tip: problem.tip,
    inputType: "number"
  };
};

const generateAgeProblems = () => {
  const scenarios = [
    {
      setup: () => {
        const age1 = Math.floor(Math.random() * 5) + 12;
        const diff = Math.floor(Math.random() * 5) + 2;
        const years = Math.floor(Math.random() * 3) + 2;
        const younger = age1 - diff;
        
        return {
          question: `Emma is ${age1} years old. Ben is ${diff} years younger than Emma. How old was Ben ${years} years ago?`,
          answer: younger - years,
          tip: `Ben's current age: ${age1} - ${diff} = ${younger}. ${years} years ago: ${younger} - ${years}`
        };
      }
    },
    {
      setup: () => {
        const age1 = Math.floor(Math.random() * 5) + 10;
        const diff = Math.floor(Math.random() * 4) + 3;
        const years = Math.floor(Math.random() * 3) + 2;
        const older = age1 + diff;
        
        return {
          question: `Tom is ${age1} years old. His sister is ${diff} years older. How old will his sister be in ${years} years?`,
          answer: older + years,
          tip: `Sister's current age: ${age1} + ${diff} = ${older}. In ${years} years: ${older} + ${years}`
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.setup();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Algebra",
    skill: "Age Problems",
    tip: problem.tip,
    inputType: "number"
  };
};

const generateSequenceProblems = () => {
  const types = [
    {
      name: "arithmetic",
      generate: () => {
        const start = Math.floor(Math.random() * 10) + 5;
        const diff = Math.floor(Math.random() * 5) + 2;
        const sequence = [start, start + diff, start + 2*diff, start + 3*diff];
        return {
          sequence: sequence,
          next: start + 4*diff,
          rule: `add ${diff} each time`
        };
      }
    },
    {
      name: "multiplication",
      generate: () => {
        const start = Math.floor(Math.random() * 3) + 2;
        const mult = 2;
        const sequence = [start, start * mult, start * mult * mult, start * mult * mult * mult];
        return {
          sequence: sequence,
          next: start * mult * mult * mult * mult,
          rule: `multiply by ${mult} each time`
        };
      }
    },
    {
      name: "fibonacci-like",
      generate: () => {
        const a = Math.floor(Math.random() * 3) + 1;
        const b = Math.floor(Math.random() * 3) + 2;
        const sequence = [a, b, a + b, b + (a + b)];
        return {
          sequence: sequence,
          next: (a + b) + (b + (a + b)),
          rule: "add the previous two numbers"
        };
      }
    }
  ];
  
  const selected = types[Math.floor(Math.random() * types.length)];
  const problem = selected.generate();
  
  return {
    question: `What number comes next in this sequence? ${problem.sequence.join(", ")}, ?`,
    answer: problem.next,
    category: "Algebra",
    skill: "Number Sequences",
    tip: `Pattern: ${problem.rule}`,
    inputType: "number"
  };
};

const generateDiagramProblems = () => {
  const scenarios = [
    {
      setup: () => {
        const grey1 = Math.floor(Math.random() * 4) + 2;
        const grey2 = Math.floor(Math.random() * 4) + 3;
        const white1 = Math.floor(Math.random() * 4) + 2;
        const center = (grey1 + grey2) * (white1 + 4);
        const white2 = 4;
        
        return {
          question: `In the diagram, the sum of the two grey circles multiplied by the sum of the two white circles equals the center.\nGrey circles: ${grey1} and ${grey2}\nWhite circles: ${white1} and ?\nCenter: ${center}\nWhat is the missing white circle?`,
          answer: white2,
          tip: `Grey sum: ${grey1} + ${grey2} = ${grey1 + grey2}. So (${grey1 + grey2}) × (${white1} + ?) = ${center}`
        };
      }
    },
    {
      setup: () => {
        const black1 = Math.floor(Math.random() * 4) + 3;
        const black2 = Math.floor(Math.random() * 4) + 2;
        const grey2 = Math.floor(Math.random() * 3) + 2;
        const center = 48;
        const grey1 = Math.floor(center / (black1 + black2)) - grey2;
        
        return {
          question: `In the diagram, the sum of the two black circles multiplied by the sum of the two grey circles equals the center.\nBlack circles: ${black1} and ${black2}\nGrey circles: ? and ${grey2}\nCenter: ${center}\nWhat is the missing grey circle?`,
          answer: grey1,
          tip: `Black sum: ${black1} + ${black2} = ${black1 + black2}. So (${black1 + black2}) × (? + ${grey2}) = ${center}`
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.setup();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Algebra",
    skill: "Diagram Problems",
    tip: problem.tip,
    inputType: "number"
  };
};

const generateMissingNumber = () => {
  const operations = [
    {
      type: "addition chain",
      generate: () => {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 20) + 10;
        const c = Math.floor(Math.random() * 20) + 10;
        const result = a + b + c;
        const missing = Math.floor(Math.random() * 3);
        
        const values = [a, b, c];
        const missingValue = values[missing];
        values[missing] = "?";
        
        return {
          question: `${values[0]} + ${values[1]} + ${values[2]} = ${result}`,
          answer: missingValue,
          tip: `Work backwards from ${result}`
        };
      }
    },
    {
      type: "mixed operations",
      generate: () => {
        const a = Math.floor(Math.random() * 10) + 5;
        const b = Math.floor(Math.random() * 5) + 2;
        const c = Math.floor(Math.random() * 10) + 10;
        const result = (a * b) + c;
        
        return {
          question: `${a} × ? + ${c} = ${result}`,
          answer: b,
          tip: `First subtract ${c} from ${result}, then divide by ${a}`
        };
      }
    }
  ];
  
  const selected = operations[Math.floor(Math.random() * operations.length)];
  const problem = selected.generate();
  
  return {
    question: `Find the missing number: ${problem.question}`,
    answer: problem.answer,
    category: "Algebra",
    skill: "Missing Numbers",
    tip: problem.tip,
    inputType: "number"
  };
};

const generateFunctionMachines = () => {
  const operations = [
    { in: 5, operation: "× 3 + 2", out: 17 },
    { in: 8, operation: "× 2 - 4", out: 12 },
    { in: 6, operation: "+ 7 × 2", out: 26 },
    { in: 10, operation: "÷ 2 + 8", out: 13 },
    { in: 12, operation: "- 4 × 3", out: 24 }
  ];
  
  const selected = operations[Math.floor(Math.random() * operations.length)];
  const testInput = Math.floor(Math.random() * 10) + 3;
  
  const calculateOutput = (input, op) => {
    if (op === "× 3 + 2") return input * 3 + 2;
    if (op === "× 2 - 4") return input * 2 - 4;
    if (op === "+ 7 × 2") return (input + 7) * 2;
    if (op === "÷ 2 + 8") return input / 2 + 8;
    if (op === "- 4 × 3") return (input - 4) * 3;
  };
  
  const answer = calculateOutput(testInput, selected.operation);
  
  return {
    question: `A function machine uses the rule: ${selected.operation}\nExample: ${selected.in} → ${selected.out}\nWhat is the output when the input is ${testInput}?`,
    answer: answer,
    category: "Algebra",
    skill: "Function Machines",
    tip: `Apply the operation: ${testInput} ${selected.operation}`,
    inputType: "number"
  };
};

export default {
  generateSymbolEquations,
  generateAnimalSymbols,
  generateBalanceEquations,
  generateComplexWordProblems,
  generateAgeProblems,
  generateSequenceProblems,
  generateDiagramProblems,
  generateMissingNumber,
  generateFunctionMachines
};