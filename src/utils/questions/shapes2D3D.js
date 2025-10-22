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

const generateShapeIdentification = (difficulty = 'medium') => {
  // Easy: Simple shapes (triangle, square, rectangle)
  const easyShapes = shapes2D.filter(s => ['triangle', 'square', 'rectangle'].includes(s.name));
  // Medium: Add pentagon and hexagon
  const mediumShapes = shapes2D.filter(s => s.name !== 'circle');
  // Hard: All shapes
  const availableShapes = difficulty === 'easy' ? easyShapes :
                          difficulty === 'medium' ? mediumShapes : shapes2D;

  const shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];
  const property = Math.random() < 0.5 ? "sides" : "vertices";

  const options = availableShapes.map(s => s.name).slice(0, 4);
  if (!options.includes(shape.name)) {
    options[0] = shape.name;
  }

  return {
    question: `Which shape has ${shape[property]} ${property}?`,
    answer: options.indexOf(shape.name),
    options: options,
    correctAnswer: shape.name,
    category: "Shapes",
    skill: "2D Shape Properties",
    tip: `Remember: vertices are the corners where sides meet`,
    inputType: "multiple-choice",
    shape: {
      type: '2d',
      name: shape.name,
      mode: 'display',
      highlightFeature: property === 'vertices' ? 'vertices' : 'edges'
    }
  };
};

const generateCountVertices2D = (difficulty = 'medium') => {
  const easyShapes = shapes2D.filter(s => ['triangle', 'square', 'rectangle'].includes(s.name));
  const mediumShapes = shapes2D.filter(s => s.vertices > 0 && s.vertices <= 5);
  const hardShapes = shapes2D.filter(s => s.vertices > 0);

  const availableShapes = difficulty === 'easy' ? easyShapes :
                          difficulty === 'medium' ? mediumShapes : hardShapes;

  const shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];

  return {
    question: `How many vertices does a ${shape.name} have?`,
    answer: shape.vertices,
    category: "Shapes",
    skill: "Counting Vertices",
    tip: "Vertices are the corners or points where the sides meet",
    inputType: "number",
    shape: {
      type: '2d',
      name: shape.name,
      mode: 'display',
      highlightFeature: 'vertices'
    }
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
    inputType: "number",
    shape: {
      type: '2d',
      name: shape.name,
      mode: 'display',
      highlightFeature: 'edges'
    }
  };
};

const generate3DProperties = (difficulty = 'medium') => {
  // Easy: Simple 3D shapes (cube, sphere, cylinder)
  const easyShapes = shapes3D.filter(s => ['cube', 'sphere', 'cylinder'].includes(s.name));
  // Medium: Add cuboid and cone
  const mediumShapes = shapes3D.filter(s => !['triangular prism', 'pyramid'].includes(s.name));
  // Hard: All 3D shapes
  const availableShapes = difficulty === 'easy' ? easyShapes :
                          difficulty === 'medium' ? mediumShapes : shapes3D;

  const shape = availableShapes[Math.floor(Math.random() * availableShapes.length)];

  // Easy: Only faces, Medium: faces and edges, Hard: all properties
  const properties = difficulty === 'easy' ? ["faces"] :
                     difficulty === 'medium' ? ["faces", "edges"] :
                     ["faces", "edges", "vertices"];

  const property = properties[Math.floor(Math.random() * properties.length)];

  // Map shape name to ShapeVisualizer format (camelCase for multi-word names)
  const shapeNameMapping = {
    "triangular prism": "triangularPrism"
  };
  const visualizerName = shapeNameMapping[shape.name] || shape.name;

  return {
    question: `How many ${property} does a ${shape.name} have?`,
    answer: shape[property],
    category: "Shapes",
    skill: "3D Shape Properties",
    tip: `Faces are flat surfaces, edges are where faces meet, vertices are corners`,
    inputType: "number",
    shape: {
      type: '3d',
      name: visualizerName,
      mode: 'display',
      highlightFeature: property
    }
  };
};

const generateShapeMatching = () => {
  const descriptions = [
    { desc: "I have 3 sides and 3 vertices", answer: "triangle", type: "2d" },
    { desc: "I have 4 equal sides and 4 right angles", answer: "square", type: "2d" },
    { desc: "I have 4 sides and 4 right angles", answer: "rectangle", type: "2d" },
    { desc: "I have 5 sides and 5 vertices", answer: "pentagon", type: "2d" },
    { desc: "I have 6 sides and 6 vertices", answer: "hexagon", type: "2d" },
    { desc: "I have no straight sides and no vertices", answer: "circle", type: "2d" },
    { desc: "I have 6 square faces", answer: "cube", type: "3d" },
    { desc: "I have 6 rectangular faces", answer: "cuboid", type: "3d" },
    { desc: "I am perfectly round in 3D", answer: "sphere", type: "3d" }
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
    inputType: "multiple-choice",
    shape: {
      type: selected.type,
      name: selected.answer,
      mode: 'display'
    }
  };
};

const generateRealWorldShapes = () => {
  const examples = [
    { object: "a dice", shape: "cube", type: "3d" },
    { object: "a football", shape: "sphere", type: "3d" },
    { object: "a can of soup", shape: "cylinder", type: "3d" },
    { object: "an ice cream cone", shape: "cone", type: "3d" },
    { object: "a cereal box", shape: "cuboid", type: "3d" },
    { object: "a stop sign", shape: "octagon", type: "2d" },
    { object: "a slice of pizza", shape: "triangle", type: "2d" },
    { object: "a window", shape: "rectangle", type: "2d" },
    { object: "a honeycomb cell", shape: "hexagon", type: "2d" }
  ];

  const selected = examples[Math.floor(Math.random() * examples.length)];

  const is3D = selected.type === "3d";
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
    inputType: "multiple-choice",
    shape: {
      type: selected.type,
      name: selected.shape,
      mode: 'display'
    }
  };
};

const generateComplexShapeProperties = (difficulty = 'medium') => {
  // This is inherently a hard question, so for easy/medium use simpler alternatives
  if (difficulty === 'easy') {
    return generateCountVertices2D(difficulty);
  }

  if (difficulty === 'medium') {
    return generate3DProperties(difficulty);
  }

  // Hard: Complex calculations
  const shape3D = shapes3D[Math.floor(Math.random() * shapes3D.length)];

  if (shape3D.edges === 0) {
    return generateRealWorldShapes(difficulty);
  }

  const total = shape3D.faces + shape3D.edges + shape3D.vertices;

  // Map shape name to ShapeVisualizer format
  const shapeNameMapping = {
    "triangular prism": "triangularPrism"
  };
  const visualizerName = shapeNameMapping[shape3D.name] || shape3D.name;

  return {
    question: `A ${shape3D.name} has ${shape3D.faces} faces, ${shape3D.edges} edges, and ${shape3D.vertices} vertices. What is the total of all these properties?`,
    answer: total,
    category: "Shapes",
    skill: "3D Shape Calculations",
    tip: `Add: ${shape3D.faces} + ${shape3D.edges} + ${shape3D.vertices}`,
    inputType: "number",
    shape: {
      type: '3d',
      name: visualizerName,
      mode: 'display'
    }
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
    inputType: "number",
    shape: {
      type: '2d',
      name: shape1.name,
      mode: 'display',
      highlightFeature: 'edges'
    }
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
    inputType: "multiple-choice",
    shape: {
      type: '2d',
      name: selected.answer,
      mode: 'display'
    }
  };
};

const generateShapeAngles = (difficulty = 'medium') => {
  const easyShapeAngles = [
    { name: "triangle", totalAngles: 180, eachAngle: 60, type: "equilateral" },
    { name: "square", totalAngles: 360, eachAngle: 90, type: "regular" }
  ];

  const mediumShapeAngles = [
    ...easyShapeAngles,
    { name: "rectangle", totalAngles: 360, eachAngle: 90, type: "regular" },
    { name: "pentagon", totalAngles: 540, eachAngle: 108, type: "regular" }
  ];

  const hardShapeAngles = [
    ...mediumShapeAngles,
    { name: "hexagon", totalAngles: 720, eachAngle: 120, type: "regular" }
  ];

  const shapeAngles = difficulty === 'easy' ? easyShapeAngles :
                      difficulty === 'medium' ? mediumShapeAngles : hardShapeAngles;

  const shape = shapeAngles[Math.floor(Math.random() * shapeAngles.length)];
  // Easy: Only ask about total angles, Medium/Hard: total or each
  const questionType = (difficulty === 'easy' || Math.random() < 0.5) ? "total" : "each";

  if (questionType === "total") {
    return {
      question: `What is the sum of all interior angles in a ${shape.name}?`,
      answer: shape.totalAngles,
      category: "Shapes",
      skill: "Shape Angles",
      tip: `Formula: (n-2) × 180°, where n is the number of sides`,
      inputType: "number",
      unit: "degrees",
      shape: {
        type: '2d',
        name: shape.name,
        mode: 'display'
      }
    };
  } else {
    return {
      question: `In a regular ${shape.name}, what is the size of each interior angle?`,
      answer: shape.eachAngle,
      category: "Shapes",
      skill: "Shape Angles",
      tip: `Divide the total angles (${shape.totalAngles}°) by the number of angles`,
      inputType: "number",
      unit: "degrees",
      shape: {
        type: '2d',
        name: shape.name,
        mode: 'display'
      }
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