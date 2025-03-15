// FractionLearningApp.js
import React, { useState, useEffect } from 'react';

const FractionLearningApp = () => {
  const [activeTab, setActiveTab] = useState('number-line-tab');
  const [currentNumberLineQuestion, setCurrentNumberLineQuestion] = useState(0);
  const [currentCakeQuestion, setCurrentCakeQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedFractions, setSelectedFractions] = useState({});
  const [selectedCakes, setSelectedCakes] = useState([]);
  const [numberLineFeedback, setNumberLineFeedback] = useState('');
  const [cakeFeedback, setCakeFeedback] = useState('');
  const [checkNumberLineDisabled, setCheckNumberLineDisabled] = useState(false);
  const [nextNumberLineDisabled, setNextNumberLineDisabled] = useState(true);
  const [checkCakeDisabled, setCheckCakeDisabled] = useState(false);
  const [nextCakeDisabled, setNextCakeDisabled] = useState(true);
  
  // Number line questions (position, correctAnswer)
  const numberLineQuestions = [
    { 
      slots: [
        { position: 0.5, correctAnswer: "1/2" },
      ],
      options: ["1/2", "1/4", "3/4"]
    },
    { 
      slots: [
        { position: 0.5, correctAnswer: "2/4" },
      ],
      options: ["1/4", "2/4", "3/4"]
    },
    { 
      slots: [
        { position: 0.25, correctAnswer: "1/4" },
        { position: 0.5, correctAnswer: "2/4" },
        { position: 0.75, correctAnswer: "3/4" },
      ],
      options: ["1/4", "2/4", "3/4"]
    },
    { 
      slots: [
        { position: 0.5, correctAnswer: "1/2" },
        { position: 0.5, correctAnswer: "2/4" },
      ],
      options: ["1/4", "1/2", "2/4", "3/4"]
    },
  ];
  
  // Define fraction colors for consistent visualization
  const fractionColors = {
    "whole": "#FFD700", // Gold for whole cakes
    "1/4": "#FF9999",   // Light red
    "2/4": "#99FF99",   // Light green
    "1/2": "#99FF99",   // Same as 2/4 (they're equivalent)
    "3/4": "#9999FF"    // Light blue
  };
  
  // Cake questions (pairs of equivalent fractions)
  const cakeQuestions = [
    {
      cakes: [
        { wholes: 1, fraction: "1/2", id: "cake1" },
        { wholes: 1, fraction: "2/4", id: "cake2" },
        { wholes: 1, fraction: "1/4", id: "cake3" }
      ],
      matches: [["cake1", "cake2"]]
    },
    {
      cakes: [
        { wholes: 2, fraction: "1/2", id: "cake1" },
        { wholes: 2, fraction: "2/4", id: "cake2" },
        { wholes: 3, fraction: "0", id: "cake3" }
      ],
      matches: [["cake1", "cake2"]]
    },
    {
      cakes: [
        { wholes: 4, fraction: "2/4", id: "cake1" },
        { wholes: 4, fraction: "1/2", id: "cake2" },
        { wholes: 4, fraction: "3/4", id: "cake3" }
      ],
      matches: [["cake1", "cake2"]]
    },
    {
      cakes: [
        { wholes: 5, fraction: "2/4", id: "cake1" },
        { wholes: 5, fraction: "1/2", id: "cake2" },
        { wholes: 5, fraction: "1/4", id: "cake3" },
        { wholes: 6, fraction: "0", id: "cake4" }
      ],
      matches: [["cake1", "cake2"]]
    },
    {
      cakes: [
        { wholes: 2, fraction: "3/4", id: "cake1" },
        { wholes: 3, fraction: "0", id: "cake2" },
        { wholes: 2, fraction: "3/4", id: "cake3" }
      ],
      matches: [["cake1", "cake3"]]
    },
    {
      cakes: [
        { wholes: 3, fraction: "1/4", id: "cake1" },
        { wholes: 3, fraction: "1/2", id: "cake2" },
        { wholes: 3, fraction: "2/4", id: "cake3" }
      ],
      matches: [["cake2", "cake3"]]
    }
  ];
  
  // Initialize the app when the component mounts
  useEffect(() => {
    setTotalQuestions(numberLineQuestions.length + cakeQuestions.length);
  }, []);
  
  // Function to show the selected tab
  const showTab = (tabId) => {
    setActiveTab(tabId);
  };
  
  // Function to select a slot on the number line
  const selectSlot = (slotIndex) => {
    // This creates a new object for the state update to trigger re-render
    setSelectedFractions(prev => ({
      ...prev,
      selectedSlot: slotIndex
    }));
  };
  
  // Function to select a fraction option
  const selectFraction = (fraction) => {
    if (selectedFractions.selectedSlot === undefined) return;
    
    setSelectedFractions(prev => ({
      ...prev,
      [prev.selectedSlot]: fraction,
      selectedSlot: undefined
    }));
  };
  
  // Function to check number line answers
  const checkNumberLineAnswers = () => {
    const question = numberLineQuestions[currentNumberLineQuestion];
    let allCorrect = true;
    
    // Check if all slots have an answer
    for (let i = 0; i < question.slots.length; i++) {
      if (!selectedFractions[i]) {
        setNumberLineFeedback("Please fill in all the blanks!");
        return;
      }
    }
    
    // Check each answer
    question.slots.forEach((slot, index) => {
      const userAnswer = selectedFractions[index];
      const correctAnswer = slot.correctAnswer;
      
      if (userAnswer !== correctAnswer) {
        allCorrect = false;
      }
    });
    
    if (allCorrect) {
      setNumberLineFeedback("Great job! That's correct! 🎉");
      setCheckNumberLineDisabled(true);
      setNextNumberLineDisabled(false);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setNumberLineFeedback("Try again! 🤔");
    }
  };
  
  // Function to move to the next number line question
  const nextNumberLineQuestion = () => {
    setCurrentNumberLineQuestion(prev => prev + 1);
    setSelectedFractions({});
    setNumberLineFeedback('');
    setCheckNumberLineDisabled(false);
    setNextNumberLineDisabled(true);
  };
  
  // Function to select a cake
  const selectCake = (cakeId) => {
    setSelectedCakes(prev => {
      if (prev.includes(cakeId)) {
        return prev.filter(id => id !== cakeId);
      } else {
        return [...prev, cakeId];
      }
    });
  };
  
  // Function to check cake matches
  const checkCakeMatches = () => {
    const question = cakeQuestions[currentCakeQuestion];
    
    // Need at least 2 cakes selected
    if (selectedCakes.length < 2) {
      setCakeFeedback("Please select at least 2 cakes to match!");
      return;
    }
    
    // Check if the selected cakes form a correct match
    let correctMatch = false;
    for (let match of question.matches) {
      // Check if all items in the match are selected
      const allSelected = match.every(id => selectedCakes.includes(id));
      // Check if no extra items are selected
      const noExtras = selectedCakes.every(id => match.includes(id));
      
      if (allSelected && noExtras) {
        correctMatch = true;
        break;
      }
    }
    
    if (correctMatch) {
      setCakeFeedback("Great job! These cakes are equal! 🎉");
      setCheckCakeDisabled(true);
      setNextCakeDisabled(false);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setCakeFeedback("Try again! These cakes aren't equal. 🤔");
    }
  };
  
  // Function to move to the next cake question
  const nextCakeQuestion = () => {
    setCurrentCakeQuestion(prev => prev + 1);
    setSelectedCakes([]);
    setCakeFeedback('');
    setCheckCakeDisabled(false);
    setNextCakeDisabled(true);
  };
  
  // Render number line tab content
  const renderNumberLineTab = () => {
    if (currentNumberLineQuestion >= numberLineQuestions.length) {
      return (
        <h2 className="text-center text-2xl font-bold mt-5">Great job! You completed all number line questions!</h2>
      );
    }
    
    const question = numberLineQuestions[currentNumberLineQuestion];
    
    return (
      <>
        <h2 className="text-center text-2xl font-bold">Where does each fraction go?</h2>
        <p className="text-center mb-4">Click on a blank spot, then click on a fraction to place it!</p>
        
        <div className="number-line relative h-24 my-10">
          <div className="line absolute top-1/2 left-[10%] right-[10%] h-1 bg-gray-800"></div>
          
          {/* Ticks and labels for whole numbers */}
          {[0, 1].map(num => (
            <React.Fragment key={num}>
              <div 
                className="tick absolute top-[40%] w-0.5 h-[20%] bg-gray-800"
                style={{ left: `${10 + num * 80}%`, transform: 'translateX(-50%)' }}
              ></div>
              <div
                className="tick-label absolute top-[15%] font-bold text-lg"
                style={{ left: `${10 + num * 80}%`, transform: 'translateX(-50%)' }}
              >
                {num}
              </div>
            </React.Fragment>
          ))}
          
          {/* Fraction slots */}
          {question.slots.map((slot, index) => (
            <div
              key={index}
              className={`fraction-slot absolute top-[60%] w-16 h-10 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center cursor-pointer ${selectedFractions.selectedSlot === index ? 'border-blue-500 border-solid' : ''}`}
              style={{ left: `${10 + slot.position * 80}%`, transform: 'translateX(-50%)' }}
              onClick={() => selectSlot(index)}
            >
              {selectedFractions[index]}
            </div>
          ))}
        </div>
        
        <div className={`feedback text-center text-xl h-10 ${numberLineFeedback.includes('Great') ? 'text-green-600' : 'text-red-500'}`}>
          {numberLineFeedback}
        </div>
        
        <div className="answer-options flex flex-wrap justify-center gap-4 my-8">
          {question.options.map((option, index) => (
            <div
              key={index}
              className="fraction-option text-xl bg-blue-100 py-2 px-5 rounded-lg border-2 border-blue-300 cursor-pointer hover:bg-blue-200"
              onClick={() => selectFraction(option)}
            >
              {option}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            className={`button py-3 px-6 text-lg rounded-lg mr-4 ${checkNumberLineDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            onClick={checkNumberLineAnswers}
            disabled={checkNumberLineDisabled}
          >
            Check Answer
          </button>
          <button
            className={`button py-3 px-6 text-lg rounded-lg ${nextNumberLineDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            onClick={nextNumberLineQuestion}
            disabled={nextNumberLineDisabled}
          >
            Next Question
          </button>
        </div>
      </>
    );
  };
  
  // Render cake tab content
  const renderCakeTab = () => {
    if (currentCakeQuestion >= cakeQuestions.length) {
      return (
        <h2 className="text-center text-2xl font-bold mt-5">Great job! You completed all cake fraction questions!</h2>
      );
    }
    
    const question = cakeQuestions[currentCakeQuestion];
    
    return (
      <>
        <h2 className="text-center text-2xl font-bold">Matching Cakes!</h2>
        <p className="text-center mb-4">Find the cakes that show the same amounts!</p>
        
        <div className="cake-container flex justify-center flex-wrap gap-5 my-8">
          {question.cakes.map((cake) => (
            <div
              key={cake.id}
              className={`cake-group flex flex-col items-center cursor-pointer ${selectedCakes.includes(cake.id) ? 'outline outline-4 outline-pink-500 rounded-lg p-2' : 'p-2'}`}
              onClick={() => selectCake(cake.id)}
            >
              {/* Whole cakes */}
              <div className="flex">
                {[...Array(cake.wholes)].map((_, i) => (
                  <div
                    key={i}
                    className="cake w-16 h-16 rounded-full m-1"
                    style={{ backgroundColor: fractionColors["whole"] }}
                  ></div>
                ))}
              </div>
              
              {/* Fractional part if needed */}
              {cake.fraction !== "0" && (
                <div className="cake relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                  {/* Create slices based on the fraction */}
                  {(() => {
                    const [numerator, denominator] = cake.fraction.split('/').map(Number);
                    // Create all slices (both filled and empty)
                    return [...Array(denominator)].map((_, i) => {
                      const isFilled = i < numerator;
                      return (
                        <div
                          key={i}
                          className="cake-slice absolute w-full h-full"
                          style={{
                            backgroundColor: isFilled ? fractionColors[cake.fraction] : "#f5f5f5",
                            clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)',
                            transformOrigin: 'center left',
                            transform: `rotate(${i * (360 / denominator)}deg)`,
                            borderRight: '1px solid rgba(0,0,0,0.1)'
                          }}
                        ></div>
                      );
                    });
                  })()}
                </div>
              )}
              
              {/* Cake label */}
              <div className="cake-label text-center text-xl font-bold mt-2">
                {cake.wholes + (cake.fraction === "0" ? "" : " " + cake.fraction)}
              </div>
            </div>
          ))}
        </div>
        
        <div className={`feedback text-center text-xl h-10 ${cakeFeedback.includes('Great') ? 'text-green-600' : 'text-red-500'}`}>
          {cakeFeedback}
        </div>
        
        <div className="flex justify-center">
          <button
            className={`button py-3 px-6 text-lg rounded-lg mr-4 ${checkCakeDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            onClick={checkCakeMatches}
            disabled={checkCakeDisabled}
          >
            Check Matches
          </button>
          <button
            className={`button py-3 px-6 text-lg rounded-lg ${nextCakeDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
            onClick={nextCakeQuestion}
            disabled={nextCakeDisabled}
          >
            Next Question
          </button>
        </div>
      </>
    );
  };
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Fraction Fun!</h1>
      
      {/* Fraction Guide */}
      <div className="w-full max-w-3xl mb-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-center font-bold mb-2">Fractions We're Learning:</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {Object.entries(fractionColors).map(([fraction, color]) => (
            fraction !== "whole" && (
              <div key={fraction} className="flex flex-col items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 mb-1">
                  {(() => {
                    if (fraction === "whole") return <div className="w-full h-full" style={{ backgroundColor: color }}></div>;
                    
                    const [numerator, denominator] = fraction.split('/').map(Number);
                    return [...Array(denominator)].map((_, i) => {
                      const isFilled = i < numerator;
                      return (
                        <div
                          key={i}
                          className="absolute w-full h-full"
                          style={{
                            backgroundColor: isFilled ? color : "#f5f5f5",
                            clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%)',
                            transformOrigin: 'center left',
                            transform: `rotate(${i * (360 / denominator)}deg)`,
                            borderRight: '1px solid rgba(0,0,0,0.1)'
                          }}
                        ></div>
                      );
                    });
                  })()}
                </div>
                <span className="text-sm font-bold">{fraction}</span>
              </div>
            )
          ))}
        </div>
      </div>
      
      <div className="tab-container w-full max-w-3xl mb-5">
        <div className="tab-buttons flex justify-center mb-5">
          <button
            className={`tab-button px-6 py-3 mx-2 rounded-t-lg ${activeTab === 'number-line-tab' ? 'bg-blue-500 text-white' : 'bg-blue-100'}`}
            onClick={() => showTab('number-line-tab')}
          >
            Number Lines
          </button>
          <button
            className={`tab-button px-6 py-3 mx-2 rounded-t-lg ${activeTab === 'cake-tab' ? 'bg-blue-500 text-white' : 'bg-blue-100'}`}
            onClick={() => showTab('cake-tab')}
          >
            Cake Fractions
          </button>
        </div>
        
        <div className="progress-bar w-full h-5 bg-blue-100 rounded-full overflow-hidden mb-5">
          <div
            className="progress h-full bg-pink-500 rounded-full"
            style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="container max-w-3xl w-full bg-white rounded-lg p-5 shadow-lg">
        {activeTab === 'number-line-tab' ? renderNumberLineTab() : renderCakeTab()}
      </div>
    </div>
  );
};

export default FractionLearningApp;