import React, { useState, useEffect, useRef } from 'react';
import { Shapes, RotateCw, Eye, EyeOff, Info } from 'lucide-react';

const ShapeVisualizer = ({
  shapeType = 'triangle',
  mode = 'display', // 'display', 'interactive', 'build'
  onShapeChange,
  showProperties = true,
  showLabels = true,
  highlightFeature = null, // 'vertices', 'edges', 'faces'
  size = 300,
  theme = 'pink',
  enable3D = false
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [selectedVertices, setSelectedVertices] = useState([]);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Color themes
  const themes = {
    pink: {
      fill: '#fce7f3',
      stroke: '#ec4899',
      vertex: '#be185d',
      edge: '#a855f7',
      face: '#f9a8d4',
      highlight: '#f43f5e',
      text: '#be185d'
    },
    blue: {
      fill: '#dbeafe',
      stroke: '#3b82f6',
      vertex: '#1e40af',
      edge: '#7c3aed',
      face: '#93c5fd',
      highlight: '#2563eb',
      text: '#1e40af'
    }
  };

  const currentTheme = themes[theme] || themes.pink;

  // 2D Shape definitions
  const shapes2D = {
    triangle: {
      name: 'Triangle',
      vertices: 3,
      edges: 3,
      angles: 3,
      points: [
        { x: 150, y: 50 },
        { x: 50, y: 200 },
        { x: 250, y: 200 }
      ]
    },
    square: {
      name: 'Square',
      vertices: 4,
      edges: 4,
      angles: 4,
      points: [
        { x: 75, y: 75 },
        { x: 225, y: 75 },
        { x: 225, y: 225 },
        { x: 75, y: 225 }
      ]
    },
    rectangle: {
      name: 'Rectangle',
      vertices: 4,
      edges: 4,
      angles: 4,
      points: [
        { x: 50, y: 100 },
        { x: 250, y: 100 },
        { x: 250, y: 200 },
        { x: 50, y: 200 }
      ]
    },
    pentagon: {
      name: 'Pentagon',
      vertices: 5,
      edges: 5,
      angles: 5,
      points: [
        { x: 150, y: 50 },
        { x: 225, y: 110 },
        { x: 195, y: 200 },
        { x: 105, y: 200 },
        { x: 75, y: 110 }
      ]
    },
    hexagon: {
      name: 'Hexagon',
      vertices: 6,
      edges: 6,
      angles: 6,
      points: [
        { x: 150, y: 50 },
        { x: 215, y: 87 },
        { x: 215, y: 163 },
        { x: 150, y: 200 },
        { x: 85, y: 163 },
        { x: 85, y: 87 }
      ]
    },
    circle: {
      name: 'Circle',
      vertices: 0,
      edges: 0,
      angles: 0,
      center: { x: 150, y: 150 },
      radius: 75
    }
  };

  // 3D Shape definitions
  const shapes3D = {
    cube: {
      name: 'Cube',
      vertices: 8,
      edges: 12,
      faces: 6,
      faceShape: 'square'
    },
    cuboid: {
      name: 'Cuboid',
      vertices: 8,
      edges: 12,
      faces: 6,
      faceShape: 'rectangle'
    },
    pyramid: {
      name: 'Pyramid',
      vertices: 5,
      edges: 8,
      faces: 5,
      faceShape: 'triangle and square'
    },
    cylinder: {
      name: 'Cylinder',
      vertices: 0,
      edges: 0,
      faces: 3,
      faceShape: 'circle'
    },
    sphere: {
      name: 'Sphere',
      vertices: 0,
      edges: 0,
      faces: 1,
      faceShape: 'curved'
    },
    cone: {
      name: 'Cone',
      vertices: 1,
      edges: 0,
      faces: 2,
      faceShape: 'circle and curved'
    },
    triangularPrism: {
      name: 'Triangular Prism',
      vertices: 6,
      edges: 9,
      faces: 5,
      faceShape: 'triangle and rectangle'
    }
  };

  const currentShape = enable3D ? shapes3D[shapeType] : shapes2D[shapeType];

  // Draw 2D shape
  const draw2DShape = (ctx) => {
    if (!currentShape) return;

    ctx.clearRect(0, 0, size, size);
    ctx.save();

    if (shapeType === 'circle') {
      // Draw circle
      ctx.beginPath();
      ctx.arc(currentShape.center.x, currentShape.center.y, currentShape.radius, 0, 2 * Math.PI);
      ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.fill;
      ctx.fill();
      ctx.strokeStyle = currentTheme.stroke;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      if (showLabels) {
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Circle', currentShape.center.x, currentShape.center.y);
      }
    } else {
      // Draw polygon
      ctx.beginPath();
      currentShape.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();

      // Fill
      ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.fill;
      ctx.fill();

      // Edges
      ctx.strokeStyle = highlightFeature === 'edges' ? currentTheme.highlight : currentTheme.stroke;
      ctx.lineWidth = highlightFeature === 'edges' ? 4 : 2;
      ctx.stroke();

      // Vertices
      if (showProperties || highlightFeature === 'vertices') {
        currentShape.points.forEach((point, index) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, highlightFeature === 'vertices' ? 8 : 5, 0, 2 * Math.PI);
          ctx.fillStyle = highlightFeature === 'vertices' ? currentTheme.highlight : currentTheme.vertex;
          ctx.fill();

          if (showLabels && highlightFeature === 'vertices') {
            ctx.fillStyle = currentTheme.text;
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`V${index + 1}`, point.x, point.y - 15);
          }
        });
      }

      // Edge labels
      if (showLabels && highlightFeature === 'edges') {
        currentShape.points.forEach((point, index) => {
          const nextPoint = currentShape.points[(index + 1) % currentShape.points.length];
          const midX = (point.x + nextPoint.x) / 2;
          const midY = (point.y + nextPoint.y) / 2;
          
          ctx.fillStyle = currentTheme.text;
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`E${index + 1}`, midX, midY);
        });
      }

      // Shape name
      if (showLabels) {
        const centerX = currentShape.points.reduce((sum, p) => sum + p.x, 0) / currentShape.points.length;
        const centerY = currentShape.points.reduce((sum, p) => sum + p.y, 0) / currentShape.points.length;
        
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(currentShape.name, centerX, centerY);
      }
    }

    ctx.restore();
  };

  // Draw 3D shape (simplified isometric view)
  const draw3DShape = (ctx) => {
    if (!currentShape) return;

    ctx.clearRect(0, 0, size, size);
    ctx.save();

    const centerX = size / 2;
    const centerY = size / 2;
    const scale = size / 6;

    // Apply rotation
    ctx.translate(centerX, centerY);
    
    // Simple 3D shapes using isometric projection
    switch (shapeType) {
      case 'cube':
      case 'cuboid':
        drawCube(ctx, scale, shapeType === 'cuboid');
        break;
      case 'pyramid':
        drawPyramid(ctx, scale);
        break;
      case 'cylinder':
        drawCylinder(ctx, scale);
        break;
      case 'sphere':
        drawSphere(ctx, scale);
        break;
      case 'cone':
        drawCone(ctx, scale);
        break;
      case 'triangularPrism':
        drawTriangularPrism(ctx, scale);
        break;
    }

    ctx.restore();
  };

  const drawCube = (ctx, scale, isRectangular = false) => {
    const width = isRectangular ? scale * 1.5 : scale;
    const height = scale;
    const depth = scale;

    // Front face
    ctx.beginPath();
    ctx.moveTo(-width, -height);
    ctx.lineTo(width, -height);
    ctx.lineTo(width, height);
    ctx.lineTo(-width, height);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.face;
    ctx.fill();
    ctx.strokeStyle = highlightFeature === 'edges' ? currentTheme.highlight : currentTheme.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Top face
    ctx.beginPath();
    ctx.moveTo(-width, -height);
    ctx.lineTo(-width + depth * 0.5, -height - depth * 0.5);
    ctx.lineTo(width + depth * 0.5, -height - depth * 0.5);
    ctx.lineTo(width, -height);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.fill;
    ctx.fill();
    ctx.stroke();

    // Right face
    ctx.beginPath();
    ctx.moveTo(width, -height);
    ctx.lineTo(width + depth * 0.5, -height - depth * 0.5);
    ctx.lineTo(width + depth * 0.5, height - depth * 0.5);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.edge;
    ctx.fill();
    ctx.stroke();

    // Vertices
    if (highlightFeature === 'vertices') {
      const vertices = [
        { x: -width, y: -height },
        { x: width, y: -height },
        { x: width, y: height },
        { x: -width, y: height },
        { x: -width + depth * 0.5, y: -height - depth * 0.5 },
        { x: width + depth * 0.5, y: -height - depth * 0.5 },
        { x: width + depth * 0.5, y: height - depth * 0.5 }
      ];

      vertices.forEach(v => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = currentTheme.highlight;
        ctx.fill();
      });
    }
  };

  const drawPyramid = (ctx, scale) => {
    // Base
    ctx.beginPath();
    ctx.moveTo(-scale, scale);
    ctx.lineTo(scale, scale);
    ctx.lineTo(scale * 0.5, scale * 0.5);
    ctx.lineTo(-scale * 0.5, scale * 0.5);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.face;
    ctx.fill();
    ctx.strokeStyle = highlightFeature === 'edges' ? currentTheme.highlight : currentTheme.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sides
    ctx.beginPath();
    ctx.moveTo(0, -scale);
    ctx.lineTo(-scale, scale);
    ctx.lineTo(scale, scale);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.fill;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -scale);
    ctx.lineTo(scale, scale);
    ctx.lineTo(scale * 0.5, scale * 0.5);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.edge;
    ctx.fill();
    ctx.stroke();

    // Apex vertex
    if (highlightFeature === 'vertices') {
      ctx.beginPath();
      ctx.arc(0, -scale, 6, 0, 2 * Math.PI);
      ctx.fillStyle = currentTheme.highlight;
      ctx.fill();
    }
  };

  const drawCylinder = (ctx, scale) => {
    // Top ellipse
    ctx.beginPath();
    ctx.ellipse(0, -scale, scale * 0.8, scale * 0.3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.fill;
    ctx.fill();
    ctx.strokeStyle = highlightFeature === 'edges' ? currentTheme.highlight : currentTheme.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.moveTo(-scale * 0.8, -scale);
    ctx.lineTo(-scale * 0.8, scale);
    ctx.ellipse(0, scale, scale * 0.8, scale * 0.3, 0, 0, Math.PI);
    ctx.lineTo(scale * 0.8, -scale);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.face;
    ctx.fill();
    ctx.stroke();
  };

  const drawSphere = (ctx, scale) => {
    // Main circle
    ctx.beginPath();
    ctx.arc(0, 0, scale, 0, 2 * Math.PI);
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.face;
    ctx.fill();
    ctx.strokeStyle = currentTheme.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Equator line
    ctx.beginPath();
    ctx.ellipse(0, 0, scale, scale * 0.3, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = currentTheme.edge;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Meridian line
    ctx.beginPath();
    ctx.ellipse(0, 0, scale * 0.3, scale, 0, 0, 2 * Math.PI);
    ctx.stroke();
  };

  const drawCone = (ctx, scale) => {
    // Base ellipse
    ctx.beginPath();
    ctx.ellipse(0, scale, scale * 0.8, scale * 0.3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.face;
    ctx.fill();
    ctx.strokeStyle = highlightFeature === 'edges' ? currentTheme.highlight : currentTheme.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cone sides
    ctx.beginPath();
    ctx.moveTo(0, -scale);
    ctx.lineTo(-scale * 0.8, scale);
    ctx.ellipse(0, scale, scale * 0.8, scale * 0.3, 0, 0, Math.PI, true);
    ctx.lineTo(0, -scale);
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.fill;
    ctx.fill();
    ctx.stroke();

    // Apex vertex
    if (highlightFeature === 'vertices') {
      ctx.beginPath();
      ctx.arc(0, -scale, 6, 0, 2 * Math.PI);
      ctx.fillStyle = currentTheme.highlight;
      ctx.fill();
    }
  };

  const drawTriangularPrism = (ctx, scale) => {
    // Front triangle
    ctx.beginPath();
    ctx.moveTo(0, -scale);
    ctx.lineTo(-scale, scale);
    ctx.lineTo(scale, scale);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.face;
    ctx.fill();
    ctx.strokeStyle = highlightFeature === 'edges' ? currentTheme.highlight : currentTheme.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Top face
    ctx.beginPath();
    ctx.moveTo(0, -scale);
    ctx.lineTo(scale * 0.5, -scale * 1.3);
    ctx.lineTo(scale * 1.5, scale * 0.7);
    ctx.lineTo(scale, scale);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.fill;
    ctx.fill();
    ctx.stroke();

    // Left face
    ctx.beginPath();
    ctx.moveTo(0, -scale);
    ctx.lineTo(scale * 0.5, -scale * 1.3);
    ctx.lineTo(-scale * 0.5, scale * 0.7);
    ctx.lineTo(-scale, scale);
    ctx.closePath();
    ctx.fillStyle = highlightFeature === 'faces' ? currentTheme.highlight : currentTheme.edge;
    ctx.fill();
    ctx.stroke();
  };

  // Animation for 3D rotation
  useEffect(() => {
    if (enable3D && mode === 'display') {
      const animate = () => {
        setRotation(prev => ({
          x: prev.x,
          y: (prev.y + 1) % 360,
          z: prev.z
        }));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [enable3D, mode]);

  // Drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    if (enable3D) {
      draw3DShape(ctx);
    } else {
      draw2DShape(ctx);
    }
  }, [shapeType, highlightFeature, rotation, enable3D]);

  // Handle vertex selection in build mode
  const handleCanvasClick = (e) => {
    if (mode !== 'build' || !currentShape.points) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is near a vertex
    currentShape.points.forEach((point, index) => {
      const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
      if (distance < 15) {
        setSelectedVertices(prev => {
          if (prev.includes(index)) {
            return prev.filter(i => i !== index);
          } else {
            return [...prev, index];
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className={`border-4 border-pink-200 rounded-lg bg-white ${mode === 'build' ? 'cursor-pointer' : ''}`}
          onClick={handleCanvasClick}
          onMouseMove={(e) => {
            if (mode === 'interactive' && !enable3D) {
              const canvas = canvasRef.current;
              const rect = canvas.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              // Check hover over elements
              if (currentShape.points) {
                let hovered = null;
                currentShape.points.forEach((point, index) => {
                  const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
                  if (distance < 15) {
                    hovered = `Vertex ${index + 1}`;
                  }
                });
                setHoveredElement(hovered);
              }
            }
          }}
        />

        {/* Hover tooltip */}
        {hoveredElement && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 rounded text-sm">
            {hoveredElement}
          </div>
        )}

        {/* 3D Controls */}
        {enable3D && (
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button
              onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
              className="p-2 bg-white rounded-lg shadow-md hover:bg-pink-50"
              title="Reset rotation"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Properties display */}
      {showProperties && currentShape && (
        <div className="bg-pink-50 rounded-lg p-4 w-full max-w-sm">
          <h3 className="font-bold text-lg text-purple-700 mb-2 flex items-center gap-2">
            <Shapes className="w-5 h-5" />
            {currentShape.name} Properties
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {currentShape.vertices !== undefined && (
              <div className="bg-white rounded p-2">
                <span className="text-gray-600">Vertices:</span>
                <span className="font-bold ml-2">{currentShape.vertices}</span>
              </div>
            )}
            {currentShape.edges !== undefined && (
              <div className="bg-white rounded p-2">
                <span className="text-gray-600">Edges:</span>
                <span className="font-bold ml-2">{currentShape.edges}</span>
              </div>
            )}
            {currentShape.faces !== undefined && (
              <div className="bg-white rounded p-2">
                <span className="text-gray-600">Faces:</span>
                <span className="font-bold ml-2">{currentShape.faces}</span>
              </div>
            )}
            {currentShape.angles !== undefined && (
              <div className="bg-white rounded p-2">
                <span className="text-gray-600">Angles:</span>
                <span className="font-bold ml-2">{currentShape.angles}</span>
              </div>
            )}
          </div>
          {currentShape.faceShape && (
            <div className="mt-2 text-sm text-gray-600">
              Face shapes: <span className="font-medium">{currentShape.faceShape}</span>
            </div>
          )}
        </div>
      )}

      {/* Mode indicator */}
      {mode !== 'display' && (
        <div className="text-sm text-gray-600 text-center">
          {mode === 'interactive' && "Hover over shape elements to explore"}
          {mode === 'build' && `Click vertices to select them (${selectedVertices.length} selected)`}
        </div>
      )}
    </div>
  );
};

export default ShapeVisualizer;