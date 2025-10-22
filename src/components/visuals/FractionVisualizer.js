import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';

const FractionVisualizer = ({
  numerator = 1,
  denominator = 2,
  mode = 'display', // 'display', 'interactive', 'compare', 'arithmetic'
  visualType = 'circle', // 'circle', 'bar', 'grid', 'numberLine'
  onFractionChange,
  showEquivalent = false,
  showMixedNumber = false,
  size = 300,
  theme = 'pink',
  compareWith = null, // { numerator: 1, denominator: 3 }
  operation = null // 'add', 'subtract', 'multiply', 'divide'
}) => {
  const [selectedParts, setSelectedParts] = useState([]);
  const [equivalentFractions, setEquivalentFractions] = useState([]);
  const canvasRef = useRef(null);

  // Color themes
  const themes = {
    pink: {
      filled: '#ec4899',
      empty: '#fce7f3',
      stroke: '#be185d',
      selected: '#f43f5e',
      compare: '#a855f7',
      text: '#be185d',
      grid: '#f9a8d4'
    },
    blue: {
      filled: '#3b82f6',
      empty: '#dbeafe',
      stroke: '#1e40af',
      selected: '#2563eb',
      compare: '#7c3aed',
      text: '#1e40af',
      grid: '#93c5fd'
    }
  };

  const currentTheme = themes[theme] || themes.pink;

  // Calculate equivalent fractions
  useEffect(() => {
    if (showEquivalent) {
      const equivs = [];
      for (let i = 1; i <= 4; i++) {
        if (i !== 1) {
          equivs.push({
            num: numerator * i,
            den: denominator * i
          });
        }
      }
      // Simplify if possible
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const g = gcd(numerator, denominator);
      if (g > 1) {
        equivs.unshift({
          num: numerator / g,
          den: denominator / g
        });
      }
      setEquivalentFractions(equivs);
    }
  }, [numerator, denominator, showEquivalent]);

  // Draw circle/pie visualization
  const drawCircle = (ctx, x, y, radius, num, den, isCompare = false) => {
    const anglePerSlice = (2 * Math.PI) / den;
    
    for (let i = 0; i < den; i++) {
      const startAngle = i * anglePerSlice - Math.PI / 2;
      const endAngle = (i + 1) * anglePerSlice - Math.PI / 2;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Fill color logic
      let fillColor = currentTheme.empty;
      if (mode === 'interactive' && selectedParts.includes(i)) {
        fillColor = currentTheme.selected;
      } else if (i < num) {
        fillColor = isCompare ? currentTheme.compare : currentTheme.filled;
      }
      
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = currentTheme.stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Draw center dot
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = currentTheme.stroke;
    ctx.fill();
  };

  // Draw bar visualization
  const drawBar = (ctx, x, y, width, height, num, den, isCompare = false) => {
    const segmentWidth = width / den;
    
    for (let i = 0; i < den; i++) {
      ctx.beginPath();
      ctx.rect(x + i * segmentWidth, y, segmentWidth, height);
      
      let fillColor = currentTheme.empty;
      if (mode === 'interactive' && selectedParts.includes(i)) {
        fillColor = currentTheme.selected;
      } else if (i < num) {
        fillColor = isCompare ? currentTheme.compare : currentTheme.filled;
      }
      
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = currentTheme.stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // Draw grid visualization
  const drawGrid = (ctx, x, y, gridSize, num, den, isCompare = false) => {
    const cols = Math.ceil(Math.sqrt(den));
    const rows = Math.ceil(den / cols);
    const cellSize = gridSize / Math.max(cols, rows);
    
    for (let i = 0; i < den; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      ctx.beginPath();
      ctx.rect(x + col * cellSize, y + row * cellSize, cellSize, cellSize);
      
      let fillColor = currentTheme.empty;
      if (mode === 'interactive' && selectedParts.includes(i)) {
        fillColor = currentTheme.selected;
      } else if (i < num) {
        fillColor = isCompare ? currentTheme.compare : currentTheme.filled;
      }
      
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = currentTheme.stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  // Draw number line visualization
  const drawNumberLine = (ctx, x, y, width, num, den) => {
    // Draw main line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.strokeStyle = currentTheme.stroke;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw tick marks for whole numbers
    for (let i = 0; i <= 2; i++) {
      const tickX = x + (i * width / 2);
      ctx.beginPath();
      ctx.moveTo(tickX, y - 10);
      ctx.lineTo(tickX, y + 10);
      ctx.stroke();
      
      // Labels
      ctx.fillStyle = currentTheme.text;
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(i.toString(), tickX, y + 25);
    }
    
    // Draw fraction marks
    for (let i = 0; i <= den; i++) {
      const fracX = x + (i * width / den);
      ctx.beginPath();
      ctx.moveTo(fracX, y - 5);
      ctx.lineTo(fracX, y + 5);
      ctx.strokeStyle = currentTheme.grid;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Draw the fraction position
    const fracPosition = x + (num * width / den);
    ctx.beginPath();
    ctx.arc(fracPosition, y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = currentTheme.filled;
    ctx.fill();
    ctx.strokeStyle = currentTheme.stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Fraction label
    ctx.fillStyle = currentTheme.text;
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${num}/${den}`, fracPosition, y - 20);
  };

  // Main drawing function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    
    const centerX = size / 2;
    const centerY = size / 2;
    
    switch (visualType) {
      case 'circle':
        if (mode === 'compare' && compareWith) {
          // Draw two circles side by side
          drawCircle(ctx, centerX - size/4, centerY, size/6, numerator, denominator);
          drawCircle(ctx, centerX + size/4, centerY, size/6, compareWith.numerator, compareWith.denominator, true);
          
          // Labels
          ctx.fillStyle = currentTheme.text;
          ctx.font = 'bold 18px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${numerator}/${denominator}`, centerX - size/4, centerY + size/4);
          ctx.fillText(`${compareWith.numerator}/${compareWith.denominator}`, centerX + size/4, centerY + size/4);
        } else {
          drawCircle(ctx, centerX, centerY, size/3, numerator, denominator);
          
          // Label
          ctx.fillStyle = currentTheme.text;
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${numerator}/${denominator}`, centerX, centerY + size/2 - 20);
        }
        break;
        
      case 'bar':
        if (mode === 'compare' && compareWith) {
          drawBar(ctx, 20, centerY - 60, size - 40, 40, numerator, denominator);
          drawBar(ctx, 20, centerY + 20, size - 40, 40, compareWith.numerator, compareWith.denominator, true);
          
          // Labels
          ctx.fillStyle = currentTheme.text;
          ctx.font = 'bold 18px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(`${numerator}/${denominator}`, 20, centerY - 70);
          ctx.fillText(`${compareWith.numerator}/${compareWith.denominator}`, 20, centerY + 70);
        } else {
          drawBar(ctx, 20, centerY - 30, size - 40, 60, numerator, denominator);
          
          // Label
          ctx.fillStyle = currentTheme.text;
          ctx.font = 'bold 24px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${numerator}/${denominator}`, centerX, centerY + 60);
        }
        break;
        
      case 'grid':
        drawGrid(ctx, centerX - size/4, centerY - size/4, size/2, numerator, denominator);
        
        // Label
        ctx.fillStyle = currentTheme.text;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${numerator}/${denominator}`, centerX, size - 30);
        break;
        
      case 'numberLine':
        drawNumberLine(ctx, 30, centerY, size - 60, numerator, denominator);
        break;

      default:
        // Default to circle visualization
        drawCircle(ctx, centerX, centerY, size/3, numerator, denominator);
        break;
    }
    
    // Draw arithmetic operation if specified
    if (mode === 'arithmetic' && operation && compareWith) {
      const symbols = {
        add: '+',
        subtract: '-',
        multiply: '×',
        divide: '÷'
      };
      
      ctx.fillStyle = currentTheme.text;
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(symbols[operation], centerX, 40);
      
      // Calculate result
      let resultNum, resultDen;
      switch (operation) {
        case 'add':
          resultDen = denominator * compareWith.denominator;
          resultNum = numerator * compareWith.denominator + compareWith.numerator * denominator;
          break;
        case 'subtract':
          resultDen = denominator * compareWith.denominator;
          resultNum = numerator * compareWith.denominator - compareWith.numerator * denominator;
          break;
        case 'multiply':
          resultNum = numerator * compareWith.numerator;
          resultDen = denominator * compareWith.denominator;
          break;
        case 'divide':
          resultNum = numerator * compareWith.denominator;
          resultDen = denominator * compareWith.numerator;
          break;

        default:
          // Default to no operation
          resultNum = numerator;
          resultDen = denominator;
          break;
      }
      
      // Simplify result
      const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
      const g = gcd(Math.abs(resultNum), resultDen);
      resultNum = resultNum / g;
      resultDen = resultDen / g;
      
      ctx.font = 'bold 24px Arial';
      ctx.fillText('=', centerX, size - 50);
      ctx.fillText(`${resultNum}/${resultDen}`, centerX, size - 20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numerator, denominator, visualType, mode, compareWith, operation, selectedParts, size, currentTheme]);

  // Handle canvas click for interactive mode
  const handleCanvasClick = (e) => {
    if (mode !== 'interactive') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = size / 2;
    const centerY = size / 2;
    
    if (visualType === 'circle') {
      // Calculate which slice was clicked
      const dx = x - centerX;
      const dy = y - centerY;
      const angle = Math.atan2(dy, dx) + Math.PI / 2;
      const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
      const slice = Math.floor(normalizedAngle / (2 * Math.PI / denominator));
      
      if (slice >= 0 && slice < denominator) {
        setSelectedParts(prev => {
          const newParts = prev.includes(slice) 
            ? prev.filter(p => p !== slice)
            : [...prev, slice];
          
          if (onFractionChange) {
            onFractionChange(newParts.length, denominator);
          }
          
          return newParts;
        });
      }
    } else if (visualType === 'bar') {
      // Calculate which segment was clicked
      const segmentWidth = (size - 40) / denominator;
      const segment = Math.floor((x - 20) / segmentWidth);
      
      if (segment >= 0 && segment < denominator) {
        setSelectedParts(prev => {
          const newParts = prev.includes(segment)
            ? prev.filter(p => p !== segment)
            : [...prev, segment];
          
          if (onFractionChange) {
            onFractionChange(newParts.length, denominator);
          }
          
          return newParts;
        });
      }
    }
  };

  // Draw on mount and when dependencies change
  useEffect(() => {
    draw();
  }, [draw]);

  // Convert to mixed number
  const getMixedNumber = () => {
    const whole = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;
    
    if (whole === 0) {
      return `${numerator}/${denominator}`;
    } else if (remainder === 0) {
      return whole.toString();
    } else {
      return `${whole} ${remainder}/${denominator}`;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className={`border-4 border-pink-200 rounded-lg bg-white ${mode === 'interactive' ? 'cursor-pointer' : ''}`}
          onClick={handleCanvasClick}
        />
      </div>
      
      {/* Controls for interactive mode */}
      {mode === 'interactive' && (
        <div className="flex gap-4">
          <button
            onClick={() => {
              const newNum = Math.max(0, numerator - 1);
              if (onFractionChange) onFractionChange(newNum, denominator);
            }}
            className="p-2 bg-pink-200 rounded-lg hover:bg-pink-300"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={numerator}
              onChange={(e) => {
                const val = Math.max(0, Math.min(denominator, parseInt(e.target.value) || 0));
                if (onFractionChange) onFractionChange(val, denominator);
              }}
              className="w-16 p-2 border-2 border-pink-300 rounded text-center font-bold"
            />
            <span className="text-2xl font-bold">/</span>
            <input
              type="number"
              value={denominator}
              onChange={(e) => {
                const val = Math.max(1, Math.min(12, parseInt(e.target.value) || 1));
                if (onFractionChange) onFractionChange(numerator, val);
              }}
              className="w-16 p-2 border-2 border-pink-300 rounded text-center font-bold"
            />
          </div>
          
          <button
            onClick={() => {
              const newNum = Math.min(denominator, numerator + 1);
              if (onFractionChange) onFractionChange(newNum, denominator);
            }}
            className="p-2 bg-pink-200 rounded-lg hover:bg-pink-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Mixed number display */}
      {showMixedNumber && numerator > denominator && (
        <div className="bg-purple-100 rounded-lg px-4 py-2">
          <span className="text-sm text-gray-600">Mixed number: </span>
          <span className="font-bold text-lg text-purple-700">{getMixedNumber()}</span>
        </div>
      )}
      
      {/* Equivalent fractions */}
      {showEquivalent && equivalentFractions.length > 0 && (
        <div className="bg-pink-50 rounded-lg p-4">
          <h3 className="font-bold text-sm text-gray-700 mb-2">Equivalent Fractions:</h3>
          <div className="flex gap-3 flex-wrap">
            {equivalentFractions.map((frac, index) => (
              <div key={index} className="bg-white rounded px-3 py-1 border-2 border-pink-200">
                <span className="font-bold">{frac.num}/{frac.den}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Visual type selector */}
      <div className="flex gap-2">
        {['circle', 'bar', 'grid', 'numberLine'].map(type => (
          <button
            key={type}
            onClick={() => {
              // Re-render with new visual type
              const canvas = canvasRef.current;
              if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, size, size);
              }
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              visualType === type 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FractionVisualizer;