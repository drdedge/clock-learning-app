const generateCapacityComparison = () => {
  const items = [
    { item: "teaspoon", options: ["5ml", "50ml", "500ml", "5l"], correct: "5ml" },
    { item: "cup of tea", options: ["25ml", "250ml", "2.5l", "25l"], correct: "250ml" },
    { item: "water bottle", options: ["50ml", "500ml", "5l", "50l"], correct: "500ml" },
    { item: "bathtub", options: ["20l", "200l", "2000l", "20000l"], correct: "200l" },
    { item: "swimming pool", options: ["100l", "1000l", "10000l", "100000l"], correct: "100000l" },
    { item: "fish tank", options: ["4ml", "40ml", "40l", "400l"], correct: "40l" },
    { item: "bucket", options: ["10ml", "100ml", "10l", "100l"], correct: "10l" },
    { item: "medicine spoon", options: ["5ml", "50ml", "500ml", "5l"], correct: "5ml" },
    { item: "juice carton", options: ["10ml", "100ml", "1l", "10l"], correct: "1l" },
    { item: "kitchen sink", options: ["2l", "20l", "200l", "2000l"], correct: "20l" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `What is the most likely capacity of a ${selected.item}?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Capacity Estimation",
    tip: `Think about the size of a ${selected.item} in real life`,
    inputType: "multiple-choice"
  };
};

const generateLengthComparison = () => {
  const items = [
    { item: "pencil", options: ["15mm", "15cm", "15m", "15km"], correct: "15cm" },
    { item: "classroom", options: ["8mm", "8cm", "8m", "8km"], correct: "8m" },
    { item: "football field", options: ["100mm", "100cm", "100m", "100km"], correct: "100m" },
    { item: "ant", options: ["5mm", "5cm", "5m", "5km"], correct: "5mm" },
    { item: "car", options: ["4mm", "4cm", "4m", "4km"], correct: "4m" },
    { item: "book", options: ["20mm", "20cm", "20m", "20km"], correct: "20cm" },
    { item: "door height", options: ["2mm", "2cm", "2m", "2km"], correct: "2m" },
    { item: "finger width", options: ["1cm", "10cm", "1m", "10m"], correct: "1cm" },
    { item: "school ruler", options: ["30mm", "30cm", "30m", "30km"], correct: "30cm" },
    { item: "distance to next town", options: ["10mm", "10cm", "10m", "10km"], correct: "10km" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `What is the most likely length/distance of a ${selected.item}?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Length Estimation",
    tip: `Consider typical sizes: mm for tiny things, cm for small objects, m for rooms/buildings, km for long distances`,
    inputType: "multiple-choice"
  };
};

const generateMassComparison = () => {
  const items = [
    { item: "apple", options: ["15g", "150g", "1.5kg", "15kg"], correct: "150g" },
    { item: "bag of sugar", options: ["10g", "100g", "1kg", "10kg"], correct: "1kg" },
    { item: "car", options: ["10kg", "100kg", "1000kg", "10000kg"], correct: "1000kg" },
    { item: "pencil", options: ["5g", "50g", "500g", "5kg"], correct: "5g" },
    { item: "school bag (full)", options: ["50g", "500g", "5kg", "50kg"], correct: "5kg" },
    { item: "bicycle", options: ["1.5kg", "15kg", "150kg", "1500kg"], correct: "15kg" },
    { item: "loaf of bread", options: ["80g", "800g", "8kg", "80kg"], correct: "800g" },
    { item: "adult person", options: ["7kg", "70kg", "700kg", "7000kg"], correct: "70kg" },
    { item: "paper clip", options: ["1g", "10g", "100g", "1kg"], correct: "1g" },
    { item: "watermelon", options: ["50g", "500g", "5kg", "50kg"], correct: "5kg" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `What is the most likely mass/weight of a ${selected.item}?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Mass Estimation",
    tip: `Think about how heavy a ${selected.item} would feel to lift`,
    inputType: "multiple-choice"
  };
};

const generateTimeComparison = () => {
  const items = [
    { item: "brushing your teeth", options: ["2 seconds", "2 minutes", "20 minutes", "2 hours"], correct: "2 minutes" },
    { item: "school day", options: ["6 minutes", "60 minutes", "6 hours", "60 hours"], correct: "6 hours" },
    { item: "eating lunch", options: ["30 seconds", "30 minutes", "3 hours", "30 hours"], correct: "30 minutes" },
    { item: "sleeping at night", options: ["8 minutes", "80 minutes", "8 hours", "80 hours"], correct: "8 hours" },
    { item: "blinking", options: ["1 second", "10 seconds", "1 minute", "10 minutes"], correct: "1 second" },
    { item: "summer holiday", options: ["6 days", "6 weeks", "6 months", "6 years"], correct: "6 weeks" },
    { item: "watching a film", options: ["2 minutes", "20 minutes", "2 hours", "20 hours"], correct: "2 hours" },
    { item: "boiling an egg", options: ["5 seconds", "5 minutes", "50 minutes", "5 hours"], correct: "5 minutes" },
    { item: "growing from baby to adult", options: ["18 days", "18 weeks", "18 months", "18 years"], correct: "18 years" },
    { item: "football match", options: ["90 seconds", "90 minutes", "9 hours", "90 hours"], correct: "90 minutes" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `How long does ${selected.item} typically take?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Time Estimation",
    tip: `Think about your daily experiences with ${selected.item}`,
    inputType: "multiple-choice"
  };
};

const generateTemperatureComparison = () => {
  const items = [
    { item: "freezing water", options: ["0°C", "10°C", "32°C", "100°C"], correct: "0°C" },
    { item: "boiling water", options: ["50°C", "75°C", "100°C", "200°C"], correct: "100°C" },
    { item: "room temperature", options: ["5°C", "20°C", "40°C", "60°C"], correct: "20°C" },
    { item: "hot summer day", options: ["15°C", "30°C", "50°C", "70°C"], correct: "30°C" },
    { item: "cold winter day", options: ["-5°C", "5°C", "15°C", "25°C"], correct: "-5°C" },
    { item: "body temperature", options: ["27°C", "37°C", "47°C", "57°C"], correct: "37°C" },
    { item: "warm bath", options: ["20°C", "40°C", "60°C", "80°C"], correct: "40°C" },
    { item: "inside a freezer", options: ["-18°C", "-5°C", "0°C", "5°C"], correct: "-18°C" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `What is the typical temperature of ${selected.item}?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Temperature Estimation",
    tip: "Remember: 0°C = freezing, 20°C = room temp, 37°C = body temp, 100°C = boiling",
    inputType: "multiple-choice"
  };
};

const generateCostComparison = () => {
  const items = [
    { item: "chocolate bar", options: ["£0.10", "£1.00", "£10.00", "£100.00"], correct: "£1.00" },
    { item: "school uniform", options: ["£3", "£30", "£300", "£3000"], correct: "£30" },
    { item: "bicycle", options: ["£10", "£100", "£1000", "£10000"], correct: "£100" },
    { item: "cinema ticket", options: ["£0.80", "£8", "£80", "£800"], correct: "£8" },
    { item: "loaf of bread", options: ["£0.15", "£1.50", "£15", "£150"], correct: "£1.50" },
    { item: "new car", options: ["£200", "£2000", "£20000", "£200000"], correct: "£20000" },
    { item: "pencil", options: ["£0.30", "£3", "£30", "£300"], correct: "£0.30" },
    { item: "tablet computer", options: ["£30", "£300", "£3000", "£30000"], correct: "£300" },
    { item: "school lunch", options: ["£0.25", "£2.50", "£25", "£250"], correct: "£2.50" },
    { item: "pair of shoes", options: ["£4", "£40", "£400", "£4000"], correct: "£40" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `What is a reasonable price for a ${selected.item}?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Cost Estimation",
    tip: `Think about typical prices when shopping for a ${selected.item}`,
    inputType: "multiple-choice"
  };
};

const generateSpeedComparison = () => {
  const items = [
    { item: "walking", options: ["0.5 km/h", "5 km/h", "50 km/h", "500 km/h"], correct: "5 km/h" },
    { item: "running", options: ["1 km/h", "10 km/h", "100 km/h", "1000 km/h"], correct: "10 km/h" },
    { item: "cycling", options: ["2 km/h", "20 km/h", "200 km/h", "2000 km/h"], correct: "20 km/h" },
    { item: "car on motorway", options: ["10 km/h", "100 km/h", "1000 km/h", "10000 km/h"], correct: "100 km/h" },
    { item: "snail", options: ["0.05 km/h", "0.5 km/h", "5 km/h", "50 km/h"], correct: "0.05 km/h" },
    { item: "airplane", options: ["90 km/h", "900 km/h", "9000 km/h", "90000 km/h"], correct: "900 km/h" },
    { item: "train", options: ["15 km/h", "150 km/h", "1500 km/h", "15000 km/h"], correct: "150 km/h" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `What is the typical speed of ${selected.item}?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Speed Estimation",
    tip: "Walking = 5 km/h, cycling = 20 km/h, car = 100 km/h",
    inputType: "multiple-choice"
  };
};

const generateQuantityComparison = () => {
  const items = [
    { item: "eggs in a carton", options: ["6", "60", "600", "6000"], correct: "6" },
    { item: "days in a year", options: ["36", "365", "3650", "36500"], correct: "365" },
    { item: "hours in a day", options: ["12", "24", "48", "100"], correct: "24" },
    { item: "fingers on two hands", options: ["5", "10", "20", "50"], correct: "10" },
    { item: "wheels on a car", options: ["2", "4", "8", "16"], correct: "4" },
    { item: "legs on a spider", options: ["4", "6", "8", "10"], correct: "8" },
    { item: "months in a year", options: ["10", "12", "24", "52"], correct: "12" },
    { item: "pennies in a pound", options: ["10", "50", "100", "1000"], correct: "100" },
    { item: "minutes in an hour", options: ["30", "60", "100", "120"], correct: "60" },
    { item: "sides on a dice", options: ["4", "6", "8", "12"], correct: "6" }
  ];
  
  const selected = items[Math.floor(Math.random() * items.length)];
  
  return {
    question: `How many ${selected.item}?`,
    answer: selected.options.indexOf(selected.correct),
    options: selected.options,
    correctAnswer: selected.correct,
    category: "Real World",
    skill: "Quantity Knowledge",
    tip: `Think about common knowledge of ${selected.item}`,
    inputType: "multiple-choice"
  };
};

const generateProportionComparison = () => {
  const scenarios = [
    {
      generate: () => {
        const people = Math.floor(Math.random() * 20) + 10;
        const fraction = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
        const wearing = Math.floor(people / fraction);
        
        return {
          question: `In a class of ${people} students, about 1/${fraction} are wearing glasses. Approximately how many students are wearing glasses?`,
          answer: wearing,
          tip: `${people} ÷ ${fraction} = ${wearing}`,
          options: [wearing - 2, wearing, wearing + 2, wearing + 5].filter(x => x > 0)
        };
      }
    },
    {
      generate: () => {
        const total = Math.floor(Math.random() * 30) + 20;
        const percentage = [25, 50, 75][Math.floor(Math.random() * 3)];
        const amount = Math.floor(total * percentage / 100);
        
        return {
          question: `A jar contains ${total} sweets. ${percentage}% are red. How many red sweets are there?`,
          answer: amount,
          tip: `${percentage}% of ${total} = ${amount}`,
          options: [amount - 3, amount, amount + 3, amount + 6].filter(x => x > 0)
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.options.indexOf(problem.answer),
    options: problem.options,
    correctAnswer: problem.answer,
    category: "Real World",
    skill: "Proportion Estimation",
    tip: problem.tip,
    inputType: "multiple-choice"
  };
};

const exports = {
  generateCapacityComparison,
  generateLengthComparison,
  generateMassComparison,
  generateTimeComparison,
  generateTemperatureComparison,
  generateCostComparison,
  generateSpeedComparison,
  generateQuantityComparison,
  generateProportionComparison
};

export default exports;