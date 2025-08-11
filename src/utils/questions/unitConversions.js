const generateLengthConversion = () => {
  const conversions = [
    { from: "cm", to: "mm", factor: 10, example: "1 cm = 10 mm" },
    { from: "m", to: "cm", factor: 100, example: "1 m = 100 cm" },
    { from: "m", to: "mm", factor: 1000, example: "1 m = 1000 mm" },
    { from: "km", to: "m", factor: 1000, example: "1 km = 1000 m" },
    { from: "mm", to: "cm", factor: 0.1, example: "10 mm = 1 cm" },
    { from: "cm", to: "m", factor: 0.01, example: "100 cm = 1 m" }
  ];
  
  const conversion = conversions[Math.floor(Math.random() * conversions.length)];
  const value = conversion.factor >= 1 
    ? Math.floor(Math.random() * 9) + 1
    : (Math.floor(Math.random() * 9) + 1) * (conversion.from === "mm" ? 10 : 100);
  
  const answer = conversion.factor >= 1 
    ? value * conversion.factor
    : Math.round(value * conversion.factor);
  
  return {
    question: `Convert ${value} ${conversion.from} to ${conversion.to}`,
    answer: answer,
    category: "Measurement",
    skill: "Length Conversion",
    tip: `Remember: ${conversion.example}`,
    inputType: "number",
    unit: conversion.to
  };
};

const generateMassConversion = () => {
  const conversions = [
    { from: "kg", to: "g", factor: 1000, example: "1 kg = 1000 g" },
    { from: "g", to: "kg", factor: 0.001, example: "1000 g = 1 kg" }
  ];
  
  const conversion = conversions[Math.floor(Math.random() * conversions.length)];
  const value = conversion.factor >= 1 
    ? Math.floor(Math.random() * 9) + 1
    : (Math.floor(Math.random() * 9) + 1) * 1000;
  
  const answer = conversion.factor >= 1 
    ? value * conversion.factor
    : value * conversion.factor;
  
  return {
    question: `Convert ${value} ${conversion.from} to ${conversion.to}`,
    answer: answer,
    category: "Measurement",
    skill: "Mass Conversion",
    tip: `Remember: ${conversion.example}`,
    inputType: "number",
    unit: conversion.to
  };
};

const generateVolumeConversion = () => {
  const conversions = [
    { from: "l", to: "ml", factor: 1000, example: "1 l = 1000 ml" },
    { from: "ml", to: "l", factor: 0.001, example: "1000 ml = 1 l" }
  ];
  
  const conversion = conversions[Math.floor(Math.random() * conversions.length)];
  const value = conversion.factor >= 1 
    ? Math.floor(Math.random() * 9) + 1
    : (Math.floor(Math.random() * 5) + 1) * 1000;
  
  const answer = conversion.factor >= 1 
    ? value * conversion.factor
    : value * conversion.factor;
  
  return {
    question: `Convert ${value} ${conversion.from} to ${conversion.to}`,
    answer: answer,
    category: "Measurement",
    skill: "Volume Conversion",
    tip: `Remember: ${conversion.example}`,
    inputType: "number",
    unit: conversion.to
  };
};

const generateMixedUnits = () => {
  const scenarios = [
    {
      generate: () => {
        const meters = Math.floor(Math.random() * 9) + 1;
        const cm = Math.floor(Math.random() * 99) + 1;
        const totalCm = meters * 100 + cm;
        return {
          question: `Convert ${meters} m and ${cm} cm to centimeters`,
          answer: totalCm,
          tip: `${meters} m = ${meters * 100} cm, then add ${cm} cm`,
          unit: "cm"
        };
      }
    },
    {
      generate: () => {
        const kg = Math.floor(Math.random() * 4) + 1;
        const g = Math.floor(Math.random() * 900) + 100;
        const totalG = kg * 1000 + g;
        return {
          question: `Convert ${kg} kg and ${g} g to grams`,
          answer: totalG,
          tip: `${kg} kg = ${kg * 1000} g, then add ${g} g`,
          unit: "g"
        };
      }
    },
    {
      generate: () => {
        const l = Math.floor(Math.random() * 4) + 1;
        const ml = Math.floor(Math.random() * 900) + 100;
        const totalMl = l * 1000 + ml;
        return {
          question: `Convert ${l} l and ${ml} ml to milliliters`,
          answer: totalMl,
          tip: `${l} l = ${l * 1000} ml, then add ${ml} ml`,
          unit: "ml"
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Measurement",
    skill: "Mixed Unit Conversion",
    tip: problem.tip,
    inputType: "number",
    unit: problem.unit
  };
};

const generateComparisonProblems = () => {
  const scenarios = [
    {
      generate: () => {
        const value1 = Math.floor(Math.random() * 900) + 100;
        const value2 = Math.floor(Math.random() * 9) + 1;
        const inMm1 = value1;
        const inMm2 = value2 * 10;
        const larger = inMm1 > inMm2 ? `${value1} mm` : `${value2} cm`;
        
        return {
          question: `Which is longer: ${value1} mm or ${value2} cm?`,
          answer: larger,
          tip: `Convert to same unit: ${value2} cm = ${value2 * 10} mm`
        };
      }
    },
    {
      generate: () => {
        const value1 = Math.floor(Math.random() * 4) + 1;
        const value2 = Math.floor(Math.random() * 3000) + 1000;
        const inG1 = value1 * 1000;
        const inG2 = value2;
        const heavier = inG1 > inG2 ? `${value1} kg` : `${value2} g`;
        
        return {
          question: `Which is heavier: ${value1} kg or ${value2} g?`,
          answer: heavier,
          tip: `Convert to same unit: ${value1} kg = ${inG1} g`
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Measurement",
    skill: "Unit Comparison",
    tip: problem.tip,
    inputType: "text"
  };
};

const generateRealWorldMeasurement = () => {
  const scenarios = [
    {
      generate: () => {
        const ribbonM = Math.floor(Math.random() * 3) + 2;
        const usedCm = Math.floor(Math.random() * 150) + 50;
        const totalCm = ribbonM * 100;
        const leftCm = totalCm - usedCm;
        
        return {
          question: `Emma has ${ribbonM} meters of ribbon. She uses ${usedCm} cm for a project. How many cm of ribbon does she have left?`,
          answer: leftCm,
          tip: `${ribbonM} m = ${totalCm} cm, then ${totalCm} - ${usedCm} = ${leftCm} cm`,
          unit: "cm"
        };
      }
    },
    {
      generate: () => {
        const bottleL = Math.floor(Math.random() * 2) + 1;
        const drankMl = Math.floor(Math.random() * 500) + 200;
        const totalMl = bottleL * 1000;
        const leftMl = totalMl - drankMl;
        
        return {
          question: `A bottle contains ${bottleL} liters of water. Tom drinks ${drankMl} ml. How many ml are left?`,
          answer: leftMl,
          tip: `${bottleL} l = ${totalMl} ml, then ${totalMl} - ${drankMl} = ${leftMl} ml`,
          unit: "ml"
        };
      }
    },
    {
      generate: () => {
        const bagKg = Math.floor(Math.random() * 3) + 2;
        const usedG = Math.floor(Math.random() * 1500) + 500;
        const totalG = bagKg * 1000;
        const leftG = totalG - usedG;
        
        return {
          question: `A bag of flour weighs ${bagKg} kg. Sarah uses ${usedG} g for baking. How many grams are left?`,
          answer: leftG,
          tip: `${bagKg} kg = ${totalG} g, then ${totalG} - ${usedG} = ${leftG} g`,
          unit: "g"
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Measurement",
    skill: "Real World Measurement",
    tip: problem.tip,
    inputType: "number",
    unit: problem.unit
  };
};

const generateSpeedDistance = () => {
  const scenarios = [
    {
      generate: () => {
        const speedKmh = [6, 8, 10, 12][Math.floor(Math.random() * 4)];
        const minutes = [30, 45, 60, 90][Math.floor(Math.random() * 4)];
        const hours = minutes / 60;
        const distanceKm = speedKmh * hours;
        const distanceM = distanceKm * 1000;
        
        return {
          question: `Maya walks at ${speedKmh} km per hour. How far does she walk in ${minutes} minutes? Answer in meters.`,
          answer: distanceM,
          tip: `${minutes} minutes = ${hours} hours. Distance = ${speedKmh} × ${hours} = ${distanceKm} km = ${distanceM} m`,
          unit: "m"
        };
      }
    },
    {
      generate: () => {
        const speed1 = Math.floor(Math.random() * 4) + 8;
        const speed2 = Math.floor(Math.random() * 4) + 4;
        const minutes = [30, 45, 60][Math.floor(Math.random() * 3)];
        const hours = minutes / 60;
        const distance1 = speed1 * hours;
        const distance2 = speed2 * hours;
        const difference = Math.abs(distance1 - distance2) * 1000;
        
        return {
          question: `John runs at ${speed1} km/h and Sarah runs at ${speed2} km/h. How much further does ${speed1 > speed2 ? 'John' : 'Sarah'} run in ${minutes} minutes? Answer in meters.`,
          answer: difference,
          tip: `Difference in speed: ${Math.abs(speed1 - speed2)} km/h. In ${hours} hours: ${Math.abs(distance1 - distance2)} km = ${difference} m`,
          unit: "m"
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Measurement",
    skill: "Speed and Distance",
    tip: problem.tip,
    inputType: "number",
    unit: problem.unit
  };
};

const generateScaleProblems = () => {
  const scenarios = [
    {
      generate: () => {
        const mapCm = Math.floor(Math.random() * 5) + 2;
        const realKm = Math.floor(Math.random() * 5) + 1;
        const scale = realKm * 1000 * 100 / mapCm;
        const newMapCm = Math.floor(Math.random() * 8) + 3;
        const newRealM = (newMapCm * scale) / 100;
        
        return {
          question: `On a map, ${mapCm} cm represents ${realKm} km in real life. How many meters does ${newMapCm} cm represent?`,
          answer: newRealM,
          tip: `Scale: ${mapCm} cm = ${realKm * 1000} m. So ${newMapCm} cm = ${newRealM} m`,
          unit: "m"
        };
      }
    },
    {
      generate: () => {
        const modelCm = Math.floor(Math.random() * 10) + 5;
        const realM = Math.floor(Math.random() * 5) + 2;
        const scale = realM * 100 / modelCm;
        const newRealM = Math.floor(Math.random() * 8) + 3;
        const newModelCm = Math.round(newRealM * 100 / scale);
        
        return {
          question: `A model car is ${modelCm} cm long. The real car is ${realM} m long. How many cm long would a model bus be if the real bus is ${newRealM} m?`,
          answer: newModelCm,
          tip: `Scale ratio: ${modelCm} cm : ${realM} m. Apply same ratio to ${newRealM} m`,
          unit: "cm"
        };
      }
    }
  ];
  
  const selected = scenarios[Math.floor(Math.random() * scenarios.length)];
  const problem = selected.generate();
  
  return {
    question: problem.question,
    answer: problem.answer,
    category: "Measurement",
    skill: "Scale Problems",
    tip: problem.tip,
    inputType: "number",
    unit: problem.unit
  };
};

export default {
  generateLengthConversion,
  generateMassConversion,
  generateVolumeConversion,
  generateMixedUnits,
  generateComparisonProblems,
  generateRealWorldMeasurement,
  generateSpeedDistance,
  generateScaleProblems
};