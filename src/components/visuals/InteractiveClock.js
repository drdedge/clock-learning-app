import React, { useState, useEffect, useRef } from 'react';
import { Clock, Check, X } from 'lucide-react';

const InteractiveClock = ({ 
  initialHour = 12, 
  initialMinute = 0,
  onTimeChange,
  readOnly = false,
  showDigital = true,
  size = 300,
  snapToQuarters = true,
  showAnswer = false,
  correctHour,
  correctMinute,
  theme = 'pink'
}) => {
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [isDragging, setIsDragging] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const svgRef = useRef(null);
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) - 20;

  // Color themes
  const themes = {
    pink: {
      border: '#ec4899',
      hourHand: '#be185d',
      minuteHand: '#a855f7',
      center: '#ec4899',
      numbers: '#be185d',
      bg: 'white',
      marks: '#fce7f3'
    },
    blue: {
      border: '#3b82f6',
      hourHand: '#1e40af',
      minuteHand: '#7c3aed',
      center: '#3b82f6',
      numbers: '#1e40af',
      bg: 'white',
      marks: '#dbeafe'
    }
  };

  const currentTheme = themes[theme] || themes.pink;

  useEffect(() => {
    if (onTimeChange) {
      onTimeChange(hour, minute);
    }
  }, [hour, minute, onTimeChange]);

  useEffect(() => {
    if (showAnswer && correctHour !== undefined && correctMinute !== undefined) {
      const userHour = hour % 12 || 12;
      const answerHour = correctHour % 12 || 12;
      setIsCorrect(userHour === answerHour && minute === correctMinute);
    }
  }, [hour, minute, correctHour, correctMinute, showAnswer]);

  const calculateAngleFromPosition = (clientX, clientY, isHourHand = false) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = clientX - rect.left - centerX;
    const y = clientY - rect.top - centerY;
    
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    
    if (isHourHand) {
      // Hour hand moves in 30-degree increments (360/12)
      const hourValue = Math.round(angle / 30) % 12;
      return { angle: hourValue * 30, value: hourValue || 12 };
    } else {
      // Minute hand
      let minuteValue = Math.round(angle / 6) % 60;
      
      // Snap to quarter hours if enabled
      if (snapToQuarters) {
        const quarters = [0, 15, 30, 45];
        const closest = quarters.reduce((prev, curr) => 
          Math.abs(curr - minuteValue) < Math.abs(prev - minuteValue) ? curr : prev
        );
        minuteValue = closest;
      }
      
      return { angle: minuteValue * 6, value: minuteValue };
    }
  };

  const handleMouseDown = (e, handType) => {
    if (readOnly) return;
    e.preventDefault();
    setIsDragging(handType);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || readOnly) return;
    
    const { value } = calculateAngleFromPosition(e.clientX, e.clientY, isDragging === 'hour');
    
    if (isDragging === 'hour') {
      setHour(value);
    } else if (isDragging === 'minute') {
      setMinute(value);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleTouchStart = (e, handType) => {
    if (readOnly) return;
    e.preventDefault();
    setIsDragging(handType);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || readOnly) return;
    
    const touch = e.touches[0];
    const { value } = calculateAngleFromPosition(touch.clientX, touch.clientY, isDragging === 'hour');
    
    if (isDragging === 'hour') {
      setHour(value);
    } else if (isDragging === 'minute') {
      setMinute(value);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteAngle = minute * 6;

  const formatTime = (h, m) => {
    const displayHour = h === 0 ? 12 : h;
    const displayMinute = m.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute}`;
  };

  const handleKeyDown = (e) => {
    if (readOnly) return;
    
    switch(e.key) {
      case 'ArrowUp':
        e.preventDefault();
        if (e.shiftKey) {
          setHour(h => (h % 12) + 1 || 12);
        } else {
          setMinute(m => snapToQuarters ? ((m + 15) % 60) : ((m + 1) % 60));
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (e.shiftKey) {
          setHour(h => h === 1 ? 12 : h - 1);
        } else {
          setMinute(m => snapToQuarters ? ((m - 15 + 60) % 60) : ((m - 1 + 60) % 60));
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        setHour(h => h === 1 ? 12 : h - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        setHour(h => (h % 12) + 1 || 12);
        break;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="relative">
        <svg 
          ref={svgRef}
          width={size} 
          height={size} 
          className={`${!readOnly ? 'cursor-pointer' : ''} select-none`}
          style={{ touchAction: 'none' }}
        >
          {/* Clock face */}
          <circle 
            cx={centerX} 
            cy={centerY} 
            r={radius} 
            fill={currentTheme.bg}
            stroke={currentTheme.border} 
            strokeWidth="4"
          />
          
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = centerX + Math.sin(angle) * (radius - 10);
            const y1 = centerY - Math.cos(angle) * (radius - 10);
            const x2 = centerX + Math.sin(angle) * (radius - 20);
            const y2 = centerY - Math.cos(angle) * (radius - 20);
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={currentTheme.marks}
                strokeWidth="2"
              />
            );
          })}
          
          {/* Numbers */}
          {[12, 3, 6, 9].map((num) => {
            const angle = ((num === 12 ? 0 : num * 30) - 90) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * (radius - 35);
            const y = centerY + Math.sin(angle) * (radius - 35) + 8;
            
            return (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize={size / 15}
                fontWeight="bold"
                fill={currentTheme.numbers}
                className="select-none"
              >
                {num}
              </text>
            );
          })}
          
          {/* Minute markers */}
          {snapToQuarters && [15, 30, 45].map((min) => {
            const angle = (min * 6 - 90) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * (radius - 35);
            const y = centerY + Math.sin(angle) * (radius - 35) + 6;
            
            return (
              <circle
                key={min}
                cx={x}
                cy={y}
                r="3"
                fill={currentTheme.marks}
              />
            );
          })}
          
          {/* Hour hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + Math.sin(hourAngle * Math.PI / 180) * (radius * 0.5)}
            y2={centerY - Math.cos(hourAngle * Math.PI / 180) * (radius * 0.5)}
            stroke={currentTheme.hourHand}
            strokeWidth={size / 50}
            strokeLinecap="round"
            className={`${!readOnly && isDragging !== 'minute' ? 'hover:stroke-purple-600' : ''} transition-colors`}
            onMouseDown={(e) => handleMouseDown(e, 'hour')}
            onTouchStart={(e) => handleTouchStart(e, 'hour')}
            style={{ cursor: !readOnly ? 'grab' : 'default' }}
          />
          
          {/* Minute hand */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + Math.sin(minuteAngle * Math.PI / 180) * (radius * 0.75)}
            y2={centerY - Math.cos(minuteAngle * Math.PI / 180) * (radius * 0.75)}
            stroke={currentTheme.minuteHand}
            strokeWidth={size / 60}
            strokeLinecap="round"
            className={`${!readOnly && isDragging !== 'hour' ? 'hover:stroke-pink-600' : ''} transition-colors`}
            onMouseDown={(e) => handleMouseDown(e, 'minute')}
            onTouchStart={(e) => handleTouchStart(e, 'minute')}
            style={{ cursor: !readOnly ? 'grab' : 'default' }}
          />
          
          {/* Center dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r={size / 40}
            fill={currentTheme.center}
          />
          
          {/* Dragging indicator */}
          {isDragging && (
            <circle
              cx={centerX}
              cy={centerY}
              r={radius + 10}
              fill="none"
              stroke={isDragging === 'hour' ? currentTheme.hourHand : currentTheme.minuteHand}
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.5"
              className="animate-pulse"
            />
          )}
        </svg>
        
        {/* Correct/Incorrect indicator */}
        {showAnswer && isCorrect !== null && (
          <div className={`absolute top-2 right-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {isCorrect ? <Check size={32} /> : <X size={32} />}
          </div>
        )}
      </div>
      
      {/* Digital display */}
      {showDigital && (
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <div className="text-3xl font-bold text-gray-800 bg-pink-100 px-4 py-2 rounded-lg">
            {formatTime(hour, minute)}
          </div>
        </div>
      )}
      
      {/* Instructions */}
      {!readOnly && (
        <div className="text-sm text-gray-600 text-center">
          <p>Drag the hands to set the time</p>
          <p className="text-xs mt-1">
            Keyboard: Arrow keys to adjust, Shift+Arrow for hours
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveClock;