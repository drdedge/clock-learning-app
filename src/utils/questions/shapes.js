// Shape Question Generators

const SHAPES_2D = [
    { name: "triangle", edges: 3, vertices: 3, angles: 3 },
    { name: "square", edges: 4, vertices: 4, angles: 4, special: "all sides equal" },
    { name: "rectangle", edges: 4, vertices: 4, angles: 4, special: "opposite sides equal" },
    { name: "pentagon", edges: 5, vertices: 5, angles: 5 },
    { name: "hexagon", edges: 6, vertices: 6, angles: 6 },
    { name: "octagon", edges: 8, vertices: 8, angles: 8 },
    { name: "circle", edges: 0, vertices: 0, angles: 0, special: "no straight edges" }
];

const SHAPES_3D = [
    { name: "cube", faces: 6, edges: 12, vertices: 8, faceShape: "square" },
    { name: "cuboid", faces: 6, edges: 12, vertices: 8, faceShape: "rectangle" },
    { name: "sphere", faces: 0, edges: 0, vertices: 0, special: "no flat faces" },
    { name: "cylinder", faces: 2, edges: 2, vertices: 0, special: "2 circular faces" },
    { name: "cone", faces: 1, edges: 1, vertices: 1, special: "1 circular face" },
    { name: "pyramid", faces: 5, edges: 8, vertices: 5, faceShape: "triangles and square" }
];

export const shape2DProperties = () => {
    const shape = SHAPES_2D[Math.floor(Math.random() * SHAPES_2D.length)];
    const properties = ["edges", "vertices (corners)", "angles"];
    const property = properties[Math.floor(Math.random() * properties.length)];
    
    let answer;
    if (property === "edges") answer = shape.edges;
    else if (property === "vertices (corners)") answer = shape.vertices;
    else answer = shape.angles;

    return {
        question: `How many ${property} does a ${shape.name} have?`,
        answer: answer,
        category: "Shapes",
        skill: "2D shape properties",
        tip: property === "vertices (corners)" 
            ? "Vertices are the corners where edges meet!" 
            : property === "edges" 
            ? "Edges are the straight lines that form the shape!"
            : "Count the inside corners of the shape!",
        inputType: "number"
    };
};

export const shape3DProperties = () => {
    const shape = SHAPES_3D[Math.floor(Math.random() * SHAPES_3D.length)];
    const properties = ["faces", "edges", "vertices (corners)"];
    const property = properties[Math.floor(Math.random() * properties.length)];
    
    let answer;
    if (property === "faces") answer = shape.faces;
    else if (property === "edges") answer = shape.edges;
    else answer = shape.vertices;

    return {
        question: `How many ${property} does a ${shape.name} have?`,
        answer: answer,
        category: "Shapes",
        skill: "3D shape properties",
        tip: property === "faces" 
            ? "Faces are the flat surfaces of a 3D shape!" 
            : property === "edges" 
            ? "Edges are where two faces meet!"
            : "Vertices are the corners where edges meet!",
        inputType: "number"
    };
};

export const shapeIdentification = () => {
    const questions = [
        {
            q: "Which shape has 3 sides and 3 corners?",
            options: ["Square", "Triangle", "Circle", "Rectangle"],
            answer: 1,
            correctAnswer: "Triangle"
        },
        {
            q: "Which shape has all sides equal and 4 corners?",
            options: ["Rectangle", "Triangle", "Square", "Pentagon"],
            answer: 2,
            correctAnswer: "Square"
        },
        {
            q: "Which shape has no corners and no straight edges?",
            options: ["Triangle", "Square", "Rectangle", "Circle"],
            answer: 3,
            correctAnswer: "Circle"
        },
        {
            q: "Which 3D shape has 6 square faces?",
            options: ["Sphere", "Cylinder", "Cube", "Cone"],
            answer: 2,
            correctAnswer: "Cube"
        },
        {
            q: "Which 3D shape rolls and has no edges?",
            options: ["Cube", "Sphere", "Pyramid", "Cuboid"],
            answer: 1,
            correctAnswer: "Sphere"
        }
    ];

    const selected = questions[Math.floor(Math.random() * questions.length)];

    return {
        question: selected.q,
        answer: selected.answer,
        options: selected.options,
        correctAnswer: selected.correctAnswer,
        category: "Shapes",
        skill: "Shape identification",
        tip: "Think about the properties that make each shape special!",
        inputType: "multiple-choice"
    };
};

export const symmetry = () => {
    const shapes = [
        { name: "square", lines: 4 },
        { name: "rectangle", lines: 2 },
        { name: "equilateral triangle", lines: 3 },
        { name: "circle", lines: "infinite" },
        { name: "regular hexagon", lines: 6 },
        { name: "isosceles triangle", lines: 1 }
    ];

    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    return {
        question: `How many lines of symmetry does a ${shape.name} have?`,
        answer: shape.lines === "infinite" ? 999 : shape.lines, // Use 999 for infinite
        category: "Shapes",
        skill: "Symmetry",
        tip: shape.lines === "infinite" 
            ? "A circle has infinite lines of symmetry - type 999!"
            : "A line of symmetry divides a shape into two matching halves!",
        inputType: "number"
    };
};

// Export all generators for this category
export default {
    shape2DProperties,
    shape3DProperties,
    shapeIdentification,
    symmetry
};