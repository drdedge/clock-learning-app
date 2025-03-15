// NumberLineFractionApp.js - Endless Mode with Dynamic Number Lines & Girly Theme
import React, { useState } from 'react';

// Helper function to format a number into a mixed number string (for common fractions)
const formatTickLabel = (num) => {
  const whole = Math.floor(num);
  const fraction = num - whole;
  if (Math.abs(fraction) < 1e-9) return whole.toString();
  if (Math.abs(fraction - 0.25) < 1e-9) return `${whole} 1/4`;
  if (Math.abs(fraction - 0.5) < 1e-9) return `${whole} 1/2`;
  if (Math.abs(fraction - 0.75) < 1e-9) return `${whole} 3/4`;
  return num.toFixed(2);
};

// Pool of questions with dynamic number lines
const poolQuestions = [
  {
    // Example: Number line from 4 to 5, ticks every 0.25.
    numberLine: { start: 4, end: 5, tickIncrement: 0.25 },
    slots: [
      { value: 4.25, correctAnswer: "4 1/4" }
    ],
    options: ["4", "4 1/4", "4 1/2", "4 3/4", "5"]
  },
  {
    // Example: Number line from 2 to 4, ticks every 0.5.
    numberLine: { start: 2, end: 4, tickIncrement: 0.5 },
    slots: [
      { value: 2.5, correctAnswer: "2 1/2" },
      { value: 3.5, correctAnswer: "3 1/2" }
    ],
    options: ["2", "2 1/2", "3", "3 1/2", "4"]
  },
  {
    // Example: Number line from 3 to 4, ticks every 0.25.
    numberLine: { start: 3, end: 4, tickIncrement: 0.25 },
    slots: [
      { value: 3.75, correctAnswer: "3 3/4" }
    ],
    options: ["3", "3 1/4", "3 1/2", "3 3/4", "4"]
  }
];

const getRandomQuestion = () => {
  const index = Math.floor(Math.random() * poolQuestions.length);
  return poolQuestions[index];
};

const NumberLineFractionApp = () => {
  // Endless mode: each correct answer loads a new random question.
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedFractions, setSelectedFractions] = useState({});
  const [feedback, setFeedback] = useState('');
  const [checkDisabled, setCheckDisabled] = useState(false);

  // When a slot is clicked, mark it as the active slot.
  const selectSlot = (slotIndex) => {
    setSelectedFractions(prev => ({
      ...prev,
      selectedSlot: slotIndex
    }));
  };

  // When a fraction option is clicked, assign it to the selected slot.
  const selectFraction = (fraction) => {
    if (selectedFractions.selectedSlot === undefined) return;
    setSelectedFractions(prev => ({
      ...prev,
      [prev.selectedSlot]: fraction,
      selectedSlot: undefined
    }));
  };

  // Check if the answers provided for the current question are correct.
  const checkAnswers = () => {
    let allCorrect = true;
    // Ensure each slot is filled.
    for (let i = 0; i < currentQuestion.slots.length; i++) {
      if (!selectedFractions[i]) {
        setFeedback("Please fill in all the blanks!");
        return;
      }
    }
    // Verify each answer.
    currentQuestion.slots.forEach((slot, index) => {
      if (selectedFractions[index] !== slot.correctAnswer) {
        allCorrect = false;
      }
    });
    if (allCorrect) {
      setFeedback("Great job! That's correct! 🎉");
      setCheckDisabled(true);
      setCorrectAnswers(prev => prev + 1);
      // Automatically load a new random question after a brief delay.
      setTimeout(() => {
        setCurrentQuestion(getRandomQuestion());
        setSelectedFractions({});
        setFeedback('');
        setCheckDisabled(false);
      }, 1500);
    } else {
      setFeedback("Try again! 🤔");
    }
  };

  // Render the number line with dynamic ticks and slots.
  const renderNumberLine = () => {
    const { start, end, tickIncrement } = currentQuestion.numberLine;
    const ticks = [];
    // Use a loop to generate tick values from start to end (inclusive).
    for (let tick = start; tick <= end + 1e-9; tick += tickIncrement) {
      // Round to avoid floating point precision issues.
      ticks.push(Math.round(tick * 1000) / 1000);
    }
    return (
      <div className="number-line relative h-24 my-10">
        {/* Draw the main line */}
        <div className="line absolute top-1/2 left-[10%] right-[10%] h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
        {/* Render tick marks and labels */}
        {ticks.map((tick, i) => {
          const normalized = (tick - start) / (end - start);
          const leftPercent = 10 + normalized * 80;
          return (
            <React.Fragment key={i}>
              <div
                className="tick absolute"
                style={{
                  top: '40%',
                  left: `${leftPercent}%`,
                  transform: 'translateX(-50%)',
                  width: '1px',
                  height: '20%',
                  backgroundColor: '#6B46C1'
                }}
              ></div>
              <div
                className="tick-label absolute font-bold text-lg text-purple-700"
                style={{
                  top: '15%',
                  left: `${leftPercent}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {formatTickLabel(tick)}
              </div>
            </React.Fragment>
          );
        })}
        {/* Render answer slots */}
        {currentQuestion.slots.map((slot, index) => {
          // Compute normalized position based on the slot's value.
          const normalized = (slot.value - start) / (end - start);
          const leftPercent = 10 + normalized * 80;
          return (
            <div
              key={index}
              className={`fraction-slot absolute top-[60%] w-16 h-10 bg-pink-100 border-2 ${selectedFractions.selectedSlot === index
                  ? 'border-purple-500 border-solid'
                  : 'border-dashed border-pink-400'
                } rounded-xl flex justify-center items-center cursor-pointer shadow-sm transition-all hover:shadow`}
              style={{ left: `${leftPercent}%`, transform: 'translateX(-50%)' }}
              onClick={() => selectSlot(index)}
            >
              {selectedFractions[index]}
            </div>
          );
        })}
      </div>
    );
  };

  // Render the full content including number line, feedback, options, and check button.
  const renderContent = () => {
    return (
      <>
        <h2 className="text-center text-2xl font-bold text-purple-700">Where does each fraction go?</h2>
        <p className="text-center mb-4 text-pink-600">
          Click on a blank spot, then click on a fraction to place it!
        </p>

        {renderNumberLine()}

        <div className={`feedback text-center text-xl h-10 ${feedback.includes('Great') ? 'text-green-600' : 'text-red-500'}`}>
          {feedback}
        </div>

        <div className="answer-options flex flex-wrap justify-center gap-4 my-8">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className="fraction-option text-xl bg-gradient-to-r from-pink-200 to-purple-200 py-2 px-5 rounded-xl border-2 border-pink-300 cursor-pointer hover:shadow-md transition-all"
              onClick={() => selectFraction(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className={`button py-3 px-6 text-lg rounded-full transition-all ${checkDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg'
              }`}
            onClick={checkAnswers}
            disabled={checkDisabled}
          >
            Check Answer
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-3xl mb-6">
        <h1 className="text-3xl font-bold text-center text-purple-700 my-4">Number Line Fractions</h1>
        {/* Decorative elements */}
        <div className="absolute top-0 left-2 w-8 h-8 bg-pink-200 rounded-full opacity-50"></div>
        <div className="absolute top-6 right-4 w-6 h-6 bg-purple-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-10 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
      </div>

      {/* Display the current score */}
      <div className="score-container mb-5">
        <p className="text-center text-xl text-purple-700">Score: {correctAnswers}</p>
      </div>

      <div className="container max-w-3xl w-full bg-white rounded-3xl p-6 shadow-lg border-2 border-pink-200">
        {renderContent()}
      </div>
    </div>
  );
};

export default NumberLineFractionApp;
