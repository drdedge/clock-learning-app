// CakeFractionApp.js - Endless Mode with Girly Theme
import React, { useState, useEffect } from 'react';

// Pool of cake questions with a variety of options
const poolQuestions = [
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
            { wholes: 3, fraction: "1/4", id: "cake1" },
            { wholes: 3, fraction: "2/8", id: "cake2" },
            { wholes: 3, fraction: "0", id: "cake3" }
        ],
        matches: [["cake1", "cake2"]]
    },
    {
        cakes: [
            { wholes: 2, fraction: "3/4", id: "cake1" },
            { wholes: 2, fraction: "6/8", id: "cake2" },
            { wholes: 2, fraction: "1/2", id: "cake3" }
        ],
        matches: [["cake1", "cake2"]]
    }
];

const getRandomQuestion = () => {
    const index = Math.floor(Math.random() * poolQuestions.length);
    return poolQuestions[index];
};

const CakeFractionApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion());
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [selectedCakes, setSelectedCakes] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [checkDisabled, setCheckDisabled] = useState(false);

    // Function to toggle cake selection
    const selectCake = (cakeId) => {
        setSelectedCakes(prev => {
            if (prev.includes(cakeId)) {
                return prev.filter(id => id !== cakeId);
            } else {
                return [...prev, cakeId];
            }
        });
    };

    // Function to check if the selected cakes form a correct match
    const checkMatches = () => {
        const question = currentQuestion;

        // Require at least 2 cakes selected
        if (selectedCakes.length < 2) {
            setFeedback("Please select at least 2 cakes to match!");
            return;
        }

        // Check if the selected cakes exactly match any valid match
        let correctMatch = false;
        for (let match of question.matches) {
            const allSelected = match.every(id => selectedCakes.includes(id));
            const noExtras = selectedCakes.every(id => match.includes(id));
            if (allSelected && noExtras) {
                correctMatch = true;
                break;
            }
        }

        if (correctMatch) {
            setFeedback("Great job! These cakes are equal! 🎉");
            setCheckDisabled(true);
            setCorrectAnswers(prev => prev + 1);
            // Automatically load a new question after a short delay
            setTimeout(() => {
                setCurrentQuestion(getRandomQuestion());
                setSelectedCakes([]);
                setFeedback('');
                setCheckDisabled(false);
            }, 1500);
        } else {
            setFeedback("Try again! These cakes aren't equal. 🤔");
        }
    };

    // Render a cake with correct whole portions and circular shaded fractional part
    const renderCake = (cake) => {
        // Render whole cake pieces
        const wholeCakes = [];
        for (let i = 0; i < cake.wholes; i++) {
            wholeCakes.push(
                <div
                    key={`whole-${cake.id}-${i}`}
                    className="cake w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full m-1 shadow-sm"
                    style={{ border: '2px solid #D1467D' }}
                ></div>
            );
        }

        // Render the fractional part using CSS conic-gradient for circular shading
        let fractionPart = null;
        if (cake.fraction !== "0") {
            const [numerator, denominator] = cake.fraction.split('/').map(Number);
            const percentage = (numerator / denominator) * 100;

            // Create conic gradient for the circular segment
            const backgroundStyle = `conic-gradient(
                from 0deg,
                #ED64A6 0%,
                #ED64A6 ${percentage}%,
                white ${percentage}%,
                white 100%
            )`;

            fractionPart = (
                <div
                    className="cake relative w-16 h-16 rounded-full overflow-hidden shadow-sm"
                    style={{
                        border: '2px solid #D1467D',
                        background: backgroundStyle
                    }}
                >
                    {/* Add slices dividers as thin lines if needed */}
                    {Array.from({ length: denominator }).map((_, i) => {
                        const angle = (i * 360 / denominator);
                        return (
                            <div
                                key={`${cake.id}-divider-${i}`}
                                className="absolute top-0 bottom-0 left-1/2 w-px"
                                style={{
                                    height: '100%',
                                    background: '#D1467D',
                                    transform: `rotate(${angle}deg)`,
                                    transformOrigin: 'bottom',
                                    opacity: 0.6
                                }}
                            ></div>
                        );
                    })}
                </div>
            );
        }

        const isSelected = selectedCakes.includes(cake.id);

        return (
            <div
                key={cake.id}
                className={`cake-group flex flex-col items-center cursor-pointer p-3 rounded-2xl transition-all duration-200 ${isSelected ? 'bg-purple-100 outline outline-4 outline-purple-400 transform scale-105' : 'hover:bg-pink-50'}`}
                onClick={() => selectCake(cake.id)}
            >
                <div className="flex flex-wrap justify-center">
                    {wholeCakes}
                </div>
                {fractionPart}
                <div className="cake-label text-center text-xl font-bold mt-2 text-purple-700">
                    {cake.wholes}{cake.fraction !== "0" ? " " + cake.fraction : ""}
                </div>
            </div>
        );
    };

    // Render the main content
    const renderContent = () => {
        const question = currentQuestion;

        return (
            <>
                <h2 className="text-center text-2xl font-bold text-purple-700">Matching Cakes!</h2>
                <p className="text-center mb-4 text-pink-600">Find the cakes that show the same amounts!</p>

                <div className="cake-container flex justify-center flex-wrap gap-5 my-8">
                    {question.cakes.map(cake => renderCake(cake))}
                </div>

                <div className={`feedback text-center text-xl min-h-10 ${feedback.includes('Great') ? 'text-green-600' : 'text-red-500'}`}>
                    {feedback}
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className={`button py-3 px-6 text-lg rounded-full transition-all ${checkDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg'}`}
                        onClick={checkMatches}
                        disabled={checkDisabled}
                    >
                        Check Matches
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full max-w-3xl mb-6">
                <h1 className="text-3xl font-bold text-center text-purple-700 my-4">Cake Fractions</h1>
                {/* Decorative elements */}
                <div className="absolute top-0 left-2 w-8 h-8 bg-pink-200 rounded-full opacity-50"></div>
                <div className="absolute top-6 right-4 w-6 h-6 bg-purple-200 rounded-full opacity-60"></div>
                <div className="absolute bottom-0 left-10 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
            </div>

            {/* Display current score */}
            <div className="score-container mb-5">
                <p className="text-center text-xl text-purple-700">Score: {correctAnswers}</p>
            </div>

            <div className="container max-w-3xl w-full bg-white rounded-3xl p-6 shadow-lg border-2 border-pink-200">
                {renderContent()}
            </div>
        </div>
    );
};

export default CakeFractionApp;