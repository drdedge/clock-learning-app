const shapes2D = [
  { name: "triangle", sides: 3, vertices: 3, angles: 3 },
  { name: "square", sides: 4, vertices: 4, angles: 4 },
  { name: "rectangle", sides: 4, vertices: 4, angles: 4 },
  { name: "pentagon", sides: 5, vertices: 5, angles: 5 },
  { name: "hexagon", sides: 6, vertices: 6, angles: 6 },
  { name: "circle", sides: 0, vertices: 0, angles: 0 }
];

const shapes3D = [
  { name: "cube", faces: 6, edges: 12, vertices: 8, faceShape: "square" },
  { name: "cuboid", faces: 6, edges: 12, vertices: 8, faceShape: "rectangle" },
  { name: "sphere", faces: 0, edges: 0, vertices: 0, faceShape: "none" },
  { name: "cylinder", faces: 2, edges: 0, vertices: 0, faceShape: "circle" },
  { name: "cone", faces: 1, edges: 0, vertices: 1, faceShape: "circle" },
  { name: "triangular prism", faces: 5, edges: 9, vertices: 6, faceShape: "triangle and rectangle" },
  { name: "pyramid", faces: 5, edges: 8, vertices: 5, faceShape: "triangle and square" }
];

const generateShapeIdentification = () => {
  const shape = shapes2D[Math.floor(Math.random() * shapes2D.length)];
  const property = Math.random() < 0.5 ? "sides" : "vertices";
  
  const options = shapes2D.map(s => s.name);
  
  return {
    question: `Which shape has ${shape[property]} ${property}?`,
    answer: options.indexOf(shape.name),
    options: options.slice(0, 4),
    correctAnswer: shape.name,
    category: "Shapes",
    skill: "2D Shape Properties",
    tip: `Remember: vertices are the corners where sides meet`,
    inputType: "multiple-choice"
  };
};

const generateCountVertices2D = () => {
  const shape = shapes2D.filter(s => s.vertices > 0)[Math.floor(Math.random() * 5)];
  
  return {
    question: `How many vertices does a ${shape.name} have?`,
    answer: shape.vertices,
    category: "Shapes",
    skill: "Counting Vertices",
    tip: "Vertices are the corners or points where the sides meet",
    inputType: "number"
  };
};

const generateCountSides2D = () => {
  const shape = shapes2D[Math.floor(Math.random() * shapes2D.length)];
  
  return {
    question: `How many sides does a ${shape.name} have?`,
    answer: shape.sides,
    category: "Shapes",
    skill: "Counting Sides",
    tip: shape.name === "circle" ? "A circle has no straight sides" : "Count each straight edge of the shape",
    inputType: "number"
  };
};

const generate3DProperties = () => {
  const shape = shapes3D[Math.floor(Math.random() * shapes3D.length)];
  const properties = ["faces", "edges", "vertices"];
  const property = properties[Math.floor(Math.random() * properties.length)];
  
  return {
    question: `How many ${property} does a ${shape.name} have?`,
    answer: shape[property],
    category: "Shapes",
    skill: "3D Shape Properties",
    tip: `Faces are flat surfaces, edges are where faces meet, vertices are corners`,
    inputType: "number"
  };
};

const generateShapeMatching = () => {
  const descriptions = [
    { desc: "I have 3 sides and 3 vertices", answer: "triangle" },
    { desc: "I have 4 equal sides and 4 right angles", answer: "square" },
    { desc: "I have 4 sides and 4 right angles", answer: "rectangle" },
    { desc: "I have 5 sides and 5 vertices", answer: "pentagon" },
    { desc: "I have 6 sides and 6 vertices", answer: "hexagon" },
    { desc: "I have no straight sides and no vertices", answer: "circle" },
    { desc: "I have 6 square faces", answer: "cube" },
    { desc: "I have 6 rectangular faces", answer: "cuboid" },
    { desc: "I am perfectly round in 3D", answer: "sphere" }
  ];
  
  const selected = descriptions[Math.floor(Math.random() * descriptions.length)];
  
  const options = selected.answer.includes("cube") || selected.answer === "sphere" 
    ? ["cube", "cuboid", "sphere", "cylinder"]
    : ["triangle", "square", "rectangle", "pentagon", "hexagon", "circle"].slice(0, 4);
  
  if (!options.includes(selected.answer)) {
    options[Math.floor(Math.random() * options.length)] = selected.answer;
  }
  
  return {
    question: `${selected.desc}. What shape am I?`,
    answer: options.indexOf(selected.answer),
    options: options,
    correctAnswer: selected.answer,
    category: "Shapes",
    skill: "Shape Recognition",
    tip: "Think about the properties described and match them to the shape",
    inputType: "multiple-choice"
  };
};

const generateRealWorldShapes = () => {
  const examples = [
    { object: "a dice", shape: "cube" },
    { object: "a football", shape: "sphere" },
    { object: "a can of soup", shape: "cylinder" },
    { object: "an ice cream cone", shape: "cone" },
    { object: "a cereal box", shape: "cuboid" },
    { object: "a stop sign", shape: "octagon" },
    { object: "a slice of pizza", shape: "triangle" },
    { object: "a window", shape: "rectangle" },
    { object: "a honeycomb cell", shape: "hexagon" }
  ];
  
  const selected = examples[Math.floor(Math.random() * examples.length)];
  
  const is3D = ["cube", "sphere", "cylinder", "cone", "cuboid"].includes(selected.shape);
  const options = is3D 
    ? ["cube", "sphere", "cylinder", "cone", "cuboid"].slice(0, 4)
    : ["triangle", "square", "rectangle", "pentagon", "hexagon", "octagon"].slice(0, 4);
  
  if (!options.includes(selected.shape)) {
    options[Math.floor(Math.random() * options.length)] = selected.shape;
  }
  
  return {
    question: `What shape is ${selected.object}?`,
    answer: options.indexOf(selected.shape),
    options: options,
    correctAnswer: selected.shape,
    category: "Shapes",
    skill: "Real World Shapes",
    tip: "Think about the shape of everyday objects around you",
    inputType: "multiple-choice"
  };
};

const generateComplexShapeProperties = () => {
  const shape3D = shapes3D[Math.floor(Math.random() * shapes3D.length)];
  
  if (shape3D.edges === 0) {
    return generateRealWorldShapes();
  }
  
  const total = shape3D.faces + shape3D.edges + shape3D.vertices;
  
  return {
    question: `A ${shape3D.name} has ${shape3D.faces} faces, ${shape3D.edges} edges, and ${shape3D.vertices} vertices. What is the total of all these properties?`,
    answer: total,
    category: "Shapes",
    skill: "3D Shape Calculations",
    tip: `Add: ${shape3D.faces} + ${shape3D.edges} + ${shape3D.vertices}`,
    inputType: "number"
  };
};

const generateShapeComparison = () => {
  const shape1 = shapes2D[Math.floor(Math.random() * 5)];
  let shape2;
  do {
    shape2 = shapes2D[Math.floor(Math.random() * 5)];
  } while (shape2.name === shape1.name);
  
  const difference = Math.abs(shape1.sides - shape2.sides);
  const moreOrFewer = shape1.sides > shape2.sides ? "more" : "fewer";
  
  return {
    question: `How many ${moreOrFewer} sides does a ${shape1.name} have than a ${shape2.name}?`,
    answer: difference,
    category: "Shapes",
    skill: "Shape Comparison",
    tip: `${shape1.name}: ${shape1.sides} sides, ${shape2.name}: ${shape2.sides} sides`,
    inputType: "number"
  };
};

const generateShapePatterns = () => {
  const patterns = [
    {
      sequence: ["triangle", "square", "pentagon", "?"],
      answer: "hexagon",
      rule: "increasing number of sides by 1"
    },
    {
      sequence: ["circle", "triangle", "circle", "triangle", "?"],
      answer: "circle",
      rule: "alternating pattern"
    },
    {
      sequence: ["square", "square", "triangle", "triangle", "circle", "?"],
      answer: "circle",
      rule: "shapes repeat twice"
    }
  ];
  
  const selected = patterns[Math.floor(Math.random() * patterns.length)];
  const options = ["triangle", "square", "circle", "pentagon", "hexagon"].slice(0, 4);
  
  if (!options.includes(selected.answer)) {
    options[Math.floor(Math.random() * options.length)] = selected.answer;
  }
  
  return {
    question: `What shape comes next in this pattern? ${selected.sequence.join(", ")}`,
    answer: options.indexOf(selected.answer),
    options: options,
    correctAnswer: selected.answer,
    category: "Shapes",
    skill: "Shape Patterns",
    tip: `Look for the pattern: ${selected.rule}`,
    inputType: "multiple-choice"
  };
};

const generateShapeAngles = () => {
  const shapeAngles = [
    { name: "triangle", totalAngles: 180, eachAngle: 60, type: "equilateral" },
    { name: "square", totalAngles: 360, eachAngle: 90, type: "regular" },
    { name: "rectangle", totalAngles: 360, eachAngle: 90, type: "regular" },
    { name: "pentagon", totalAngles: 540, eachAngle: 108, type: "regular" },
    { name: "hexagon", totalAngles: 720, eachAngle: 120, type: "regular" }
  ];
  
  const shape = shapeAngles[Math.floor(Math.random() * shapeAngles.length)];
  const questionType = Math.random() < 0.5 ? "total" : "each";
  
  if (questionType === "total") {
    return {
      question: `What is the sum of all interior angles in a ${shape.name}?`,
      answer: shape.totalAngles,
      category: "Shapes",
      skill: "Shape Angles",
      tip: `Formula: (n-2) × 180°, where n is the number of sides`,
      inputType: "number",
      unit: "degrees"
    };
  } else {
    return {
      question: `In a regular ${shape.name}, what is the size of each interior angle?`,
      answer: shape.eachAngle,
      category: "Shapes",
      skill: "Shape Angles",
      tip: `Divide the total angles (${shape.totalAngles}°) by the number of angles`,
      inputType: "number",
      unit: "degrees"
    };
  }
};

const exports = {
  generateShapeIdentification,
  generateCountVertices2D,
  generateCountSides2D,
  generate3DProperties,
  generateShapeMatching,
  generateRealWorldShapes,
  generateComplexShapeProperties,
  generateShapeComparison,
  generateShapePatterns,
  generateShapeAngles
};

export default exports;