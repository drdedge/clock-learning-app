const generateBarChartReading = () => {
  const subjects = ["Maths", "English", "Science", "Art", "Music", "PE"];
  const students = ["Emma", "Tom", "Sarah", "Jack", "Lily"];
  
  const data = {};
  const selectedSubjects = subjects.slice(0, 4);
  
  selectedSubjects.forEach(subject => {
    data[subject] = Math.floor(Math.random() * 8) + 3;
  });
  
  const questionTypes = [
    {
      type: "highest",
      generate: () => {
        const highest = Object.entries(data).reduce((a, b) => a[1] > b[1] ? a : b);
        return {
          question: `The bar chart shows favorite subjects in a class.\n${Object.entries(data).map(([k, v]) => `${k}: ${v} students`).join("\n")}\nWhich subject is most popular?`,
          answer: highest[0],
          tip: "Look for the highest bar or largest number"
        };
      }
    },
    {
      type: "total",
      generate: () => {
        const total = Object.values(data).reduce((a, b) => a + b, 0);
        return {
          question: `The bar chart shows favorite subjects in a class.\n${Object.entries(data).map(([k, v]) => `${k}: ${v} students`).join("\n")}\nHow many students were surveyed in total?`,
          answer: total,
          tip: `Add all the values: ${Object.values(data).join(" + ")}`
        };
      }
    },
    {
      type: "difference",
      generate: () => {
        const subjects = Object.keys(data);
        const subj1 = subjects[0];
        const subj2 = subjects[1];
        const diff = Math.abs(data[subj1] - data[subj2]);
        return {
          question: `The bar chart shows favorite subjects in a class.\n${Object.entries(data).map(([k, v]) => `${k}: ${v} students`).join("\n")}\nWhat is the difference between ${subj1} and ${subj2}?`,
          answer: diff,
          tip: `${subj1}: ${data[subj1]}, ${subj2}: ${data[subj2]}, Difference: ${diff}`
        };
      }
    }
  ];
  
  const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Graphs",
    skill: "Bar Chart Reading",
    tip: problem.tip,
    inputType: typeof problem.answer === "string" ? "text" : "number"
  };
};

const generatePictogram = () => {
  const items = ["apples", "books", "cars", "flowers", "stars", "hearts"];
  const item = items[Math.floor(Math.random() * items.length)];
  const symbolValue = [2, 5, 10][Math.floor(Math.random() * 3)];
  
  const data = {
    "Monday": Math.floor(Math.random() * 4) + 2,
    "Tuesday": Math.floor(Math.random() * 4) + 1,
    "Wednesday": Math.floor(Math.random() * 4) + 2,
    "Thursday": Math.floor(Math.random() * 4) + 1,
    "Friday": Math.floor(Math.random() * 4) + 3
  };
  
  const questionTypes = [
    {
      type: "day_value",
      generate: () => {
        const day = Object.keys(data)[Math.floor(Math.random() * 5)];
        return {
          question: `In a pictogram, each symbol represents ${symbolValue} ${item}.\n${Object.entries(data).map(([k, v]) => `${k}: ${"⭐".repeat(v)}`).join("\n")}\nHow many ${item} on ${day}?`,
          answer: data[day] * symbolValue,
          tip: `${day} has ${data[day]} symbols × ${symbolValue} = ${data[day] * symbolValue}`
        };
      }
    },
    {
      type: "total",
      generate: () => {
        const total = Object.values(data).reduce((a, b) => a + b, 0) * symbolValue;
        return {
          question: `In a pictogram, each symbol represents ${symbolValue} ${item}.\n${Object.entries(data).map(([k, v]) => `${k}: ${"⭐".repeat(v)}`).join("\n")}\nWhat is the total for the whole week?`,
          answer: total,
          tip: `Total symbols: ${Object.values(data).reduce((a, b) => a + b, 0)} × ${symbolValue} = ${total}`
        };
      }
    },
    {
      type: "most",
      generate: () => {
        const most = Object.entries(data).reduce((a, b) => a[1] > b[1] ? a : b);
        return {
          question: `In a pictogram, each symbol represents ${symbolValue} ${item}.\n${Object.entries(data).map(([k, v]) => `${k}: ${"⭐".repeat(v)}`).join("\n")}\nWhich day had the most ${item}?`,
          answer: most[0],
          tip: `Look for the day with the most symbols`
        };
      }
    }
  ];
  
  const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Graphs",
    skill: "Pictograms",
    tip: problem.tip,
    inputType: typeof problem.answer === "string" ? "text" : "number"
  };
};

const generateLineGraph = () => {
  const contexts = [
    {
      title: "Temperature over a day",
      unit: "°C",
      times: ["6am", "9am", "12pm", "3pm", "6pm"],
      generateData: () => [8, 12, 18, 20, 15]
    },
    {
      title: "Height of plant over weeks",
      unit: "cm",
      times: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      generateData: () => [2, 5, 9, 14, 20]
    },
    {
      title: "Savings over months",
      unit: "£",
      times: ["Jan", "Feb", "Mar", "Apr", "May"],
      generateData: () => [10, 25, 35, 50, 70]
    }
  ];
  
  const context = contexts[Math.floor(Math.random() * contexts.length)];
  const data = context.generateData();
  
  const questionTypes = [
    {
      type: "specific_value",
      generate: () => {
        const index = Math.floor(Math.random() * data.length);
        return {
          question: `${context.title}:\n${context.times.map((t, i) => `${t}: ${data[i]}${context.unit}`).join("\n")}\nWhat was the value at ${context.times[index]}?`,
          answer: data[index],
          tip: `Look at ${context.times[index]} on the graph`
        };
      }
    },
    {
      type: "increase",
      generate: () => {
        const start = 0;
        const end = data.length - 1;
        const increase = data[end] - data[start];
        return {
          question: `${context.title}:\n${context.times.map((t, i) => `${t}: ${data[i]}${context.unit}`).join("\n")}\nWhat was the total increase from ${context.times[start]} to ${context.times[end]}?`,
          answer: increase,
          tip: `${data[end]} - ${data[start]} = ${increase}`
        };
      }
    },
    {
      type: "highest",
      generate: () => {
        const max = Math.max(...data);
        const index = data.indexOf(max);
        return {
          question: `${context.title}:\n${context.times.map((t, i) => `${t}: ${data[i]}${context.unit}`).join("\n")}\nAt what time was the highest value?`,
          answer: context.times[index],
          tip: `The highest value (${max}) was at ${context.times[index]}`
        };
      }
    }
  ];
  
  const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Graphs",
    skill: "Line Graphs",
    tip: problem.tip,
    inputType: typeof problem.answer === "string" ? "text" : "number",
    unit: typeof problem.answer === "number" ? context.unit : undefined
  };
};

const generatePieChart = () => {
  const contexts = [
    {
      title: "Favorite colors in class",
      total: 24,
      items: ["Red", "Blue", "Green", "Yellow"],
      generateData: () => [6, 8, 4, 6]
    },
    {
      title: "Time spent on activities",
      total: 60,
      items: ["Reading", "Playing", "Homework", "TV"],
      generateData: () => [15, 20, 15, 10]
    },
    {
      title: "Fruits sold at shop",
      total: 100,
      items: ["Apples", "Bananas", "Oranges", "Grapes"],
      generateData: () => [30, 25, 20, 25]
    }
  ];
  
  const context = contexts[Math.floor(Math.random() * contexts.length)];
  const data = context.generateData();
  
  const questionTypes = [
    {
      type: "fraction",
      generate: () => {
        const index = Math.floor(Math.random() * data.length);
        const value = data[index];
        const fraction = `${value}/${context.total}`;
        const simplified = simplifyFraction(value, context.total);
        
        return {
          question: `${context.title} (Total: ${context.total}):\n${context.items.map((item, i) => `${item}: ${data[i]}`).join("\n")}\nWhat fraction is ${context.items[index]}?`,
          answer: simplified,
          tip: `${context.items[index]} is ${value} out of ${context.total}`
        };
      }
    },
    {
      type: "percentage",
      generate: () => {
        const index = Math.floor(Math.random() * data.length);
        const percentage = Math.round((data[index] / context.total) * 100);
        
        return {
          question: `${context.title} (Total: ${context.total}):\n${context.items.map((item, i) => `${item}: ${data[i]}`).join("\n")}\nWhat percentage is ${context.items[index]}?`,
          answer: percentage,
          tip: `(${data[index]} ÷ ${context.total}) × 100 = ${percentage}%`
        };
      }
    },
    {
      type: "largest",
      generate: () => {
        const max = Math.max(...data);
        const index = data.indexOf(max);
        
        return {
          question: `${context.title} (Total: ${context.total}):\n${context.items.map((item, i) => `${item}: ${data[i]}`).join("\n")}\nWhich category is the largest?`,
          answer: context.items[index],
          tip: `${context.items[index]} has the highest value: ${max}`
        };
      }
    }
  ];
  
  const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Graphs",
    skill: "Pie Charts",
    tip: problem.tip,
    inputType: typeof problem.answer === "string" ? "text" : "number",
    unit: problem.answer.toString().includes("%") ? "%" : undefined
  };
};

const generateTallyChart = () => {
  const contexts = [
    { title: "Pets owned by students", items: ["Dogs", "Cats", "Fish", "Birds", "Rabbits"] },
    { title: "Favorite sports", items: ["Football", "Tennis", "Swimming", "Cricket", "Basketball"] },
    { title: "Books read this month", items: ["0-2", "3-5", "6-8", "9-11", "12+"] }
  ];
  
  const context = contexts[Math.floor(Math.random() * contexts.length)];
  const data = {};
  
  context.items.slice(0, 4).forEach(item => {
    data[item] = Math.floor(Math.random() * 4) * 5 + Math.floor(Math.random() * 5);
  });
  
  const tallyToMarks = (n) => {
    const fives = Math.floor(n / 5);
    const remainder = n % 5;
    return "||||/ ".repeat(fives) + "|".repeat(remainder);
  };
  
  const questionTypes = [
    {
      type: "count",
      generate: () => {
        const item = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
        return {
          question: `${context.title} (Tally Chart):\n${Object.entries(data).map(([k, v]) => `${k}: ${tallyToMarks(v)}`).join("\n")}\nHow many for ${item}?`,
          answer: data[item],
          tip: `Count the tally marks: groups of 5 plus singles`
        };
      }
    },
    {
      type: "total",
      generate: () => {
        const total = Object.values(data).reduce((a, b) => a + b, 0);
        return {
          question: `${context.title} (Tally Chart):\n${Object.entries(data).map(([k, v]) => `${k}: ${tallyToMarks(v)}`).join("\n")}\nWhat is the total count?`,
          answer: total,
          tip: `Add all values: ${Object.values(data).join(" + ")} = ${total}`
        };
      }
    },
    {
      type: "most_popular",
      generate: () => {
        const max = Math.max(...Object.values(data));
        const mostPopular = Object.entries(data).find(([k, v]) => v === max)[0];
        return {
          question: `${context.title} (Tally Chart):\n${Object.entries(data).map(([k, v]) => `${k}: ${tallyToMarks(v)}`).join("\n")}\nWhich is most popular?`,
          answer: mostPopular,
          tip: `Look for the row with the most tally marks`
        };
      }
    }
  ];
  
  const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Graphs",
    skill: "Tally Charts",
    tip: problem.tip,
    inputType: typeof problem.answer === "string" ? "text" : "number"
  };
};

const generateCarrollDiagram = () => {
  const contexts = [
    {
      title: "Animal classification",
      property1: "Has 4 legs",
      property2: "Can fly",
      items: {
        "Yes/Yes": ["Flying squirrel"],
        "Yes/No": ["Dog", "Cat", "Horse"],
        "No/Yes": ["Bird", "Bat"],
        "No/No": ["Snake", "Fish"]
      }
    },
    {
      title: "Number properties",
      property1: "Even",
      property2: "Greater than 10",
      items: {
        "Yes/Yes": [12, 14, 16, 18],
        "Yes/No": [2, 4, 6, 8],
        "No/Yes": [11, 13, 15, 17],
        "No/No": [1, 3, 5, 7, 9]
      }
    }
  ];
  
  const context = contexts[Math.floor(Math.random() * contexts.length)];
  
  const questionTypes = [
    {
      type: "count_category",
      generate: () => {
        const categories = Object.keys(context.items);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const count = context.items[category].length;
        const [prop1, prop2] = category.split("/");
        
        return {
          question: `Carroll Diagram - ${context.title}:\n${context.property1} (${prop1}) and ${context.property2} (${prop2})\nHow many items fit this description?`,
          answer: count,
          tip: `Count items that are ${prop1} for "${context.property1}" and ${prop2} for "${context.property2}"`
        };
      }
    },
    {
      type: "total",
      generate: () => {
        const total = Object.values(context.items).reduce((sum, arr) => sum + arr.length, 0);
        return {
          question: `Carroll Diagram - ${context.title}:\nHow many items in total are classified?`,
          answer: total,
          tip: `Add all items from all four categories`
        };
      }
    }
  ];
  
  const selected = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Graphs",
    skill: "Carroll Diagrams",
    tip: problem.tip,
    inputType: "number"
  };
};

const simplifyFraction = (num, den) => {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const g = gcd(num, den);
  return `${num/g}/${den/g}`;
};

export default {
  generateBarChartReading,
  generatePictogram,
  generateLineGraph,
  generatePieChart,
  generateTallyChart,
  generateCarrollDiagram
};