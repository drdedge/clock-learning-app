import React, { useState, useEffect } from 'react';
import PageWrapper from '../shared/PageWrapper';

// Money Calculation App Component
function MoneyCalculationApp() {
    const [problem, setProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    // Names for variety
    const names = ['Emma', 'Ben', 'Mia', 'Jack', 'Sara', 'Leo', 'Ella', 'Oscar', 'Lily', 'Noah', 'Grace', 'Tom', 'Sophie', 'Oliver', 'Ava', 'Charlie'];

    // Items with prices in pence
    const items = {
        easy: [
            { name: 'chocolate bar', minPrice: 50, maxPrice: 120 },
            { name: 'lollipop', minPrice: 20, maxPrice: 50 },
            { name: 'apple', minPrice: 30, maxPrice: 60 },
            { name: 'banana', minPrice: 25, maxPrice: 45 },
            { name: 'pencil', minPrice: 30, maxPrice: 80 },
            { name: 'eraser', minPrice: 40, maxPrice: 90 }
        ],
        medium: [
            { name: 'toy car', minPrice: 100, maxPrice: 200 },
            { name: 'comic book', minPrice: 150, maxPrice: 300 },
            { name: 'sticker pack', minPrice: 80, maxPrice: 150 },
            { name: 'cupcake', minPrice: 90, maxPrice: 150 },
            { name: 'juice box', minPrice: 60, maxPrice: 120 },
            { name: 'sandwich', minPrice: 100, maxPrice: 200 }
        ],
        hard: [
            { name: 'puzzle', minPrice: 200, maxPrice: 400 },
            { name: 'book', minPrice: 250, maxPrice: 500 },
            { name: 'paint set', minPrice: 200, maxPrice: 350 },
            { name: 'board game', minPrice: 400, maxPrice: 700 },
            { name: 'plush toy', minPrice: 150, maxPrice: 300 },
            { name: 'magic trick set', minPrice: 300, maxPrice: 600 }
        ]
    };

    // Generate a random price in the given range
    const randomPrice = (min, max) => {
        const price = Math.floor(Math.random() * (max - min + 1) + min);
        return Math.round(price / 5) * 5; // Round to nearest 5p
    };

    // Format pence to pounds and pence
    const formatMoney = (pence) => {
        const pounds = Math.floor(pence / 100);
        const remainingPence = pence % 100;
        if (remainingPence === 0) {
            return `£${pounds}.00`;
        }
        return `£${pounds}.${remainingPence.toString().padStart(2, '0')}`;
    };

    // Generate a new problem
    const generateProblem = () => {
        const name = names[Math.floor(Math.random() * names.length)];
        const difficulty = Math.random();

        let itemCount, totalMoney, itemPool;

        if (difficulty < 0.33) {
            // Easy: 1-2 items, money £1-£4
            itemCount = Math.random() < 0.7 ? 1 : 2;
            totalMoney = (Math.floor(Math.random() * 30) + 10) * 10; // £1.00 to £4.00
            itemPool = items.easy;
        } else if (difficulty < 0.66) {
            // Medium: 2-3 items, money £3-£7
            itemCount = Math.random() < 0.5 ? 2 : 3;
            totalMoney = (Math.floor(Math.random() * 40) + 30) * 10; // £3.00 to £7.00
            itemPool = [...items.easy, ...items.medium];
        } else {
            // Hard: 2-4 items, money £5-£10
            itemCount = Math.floor(Math.random() * 3) + 2;
            totalMoney = (Math.floor(Math.random() * 50) + 50) * 10; // £5.00 to £10.00
            itemPool = [...items.medium, ...items.hard];
        }

        // Generate items
        const purchasedItems = [];
        let totalSpent = 0;

        for (let i = 0; i < itemCount; i++) {
            const item = itemPool[Math.floor(Math.random() * itemPool.length)];
            const price = randomPrice(item.minPrice, item.maxPrice);
            purchasedItems.push({ name: item.name, price });
            totalSpent += price;
        }

        // Ensure the person has enough money
        if (totalSpent >= totalMoney) {
            totalMoney = totalSpent + (Math.floor(Math.random() * 20) + 5) * 10;
        }

        const change = totalMoney - totalSpent;

        setProblem({
            name,
            totalMoney,
            items: purchasedItems,
            totalSpent,
            change
        });
        setUserAnswer('');
        setShowHint(false);
        setFeedback('');
    };

    // Check answer
    const checkAnswer = () => {
        if (!userAnswer) {
            setFeedback('Please enter an answer!');
            return;
        }

        setAttempts(attempts + 1);

        // Parse user answer - accept formats like "2.50", "£2.50", "250p"
        let answerInPence;
        const cleanAnswer = userAnswer.replace(/[£\s]/g, '');

        if (cleanAnswer.includes('.')) {
            // Pounds format
            answerInPence = Math.round(parseFloat(cleanAnswer) * 100);
        } else if (cleanAnswer.toLowerCase().includes('p')) {
            // Pence format
            answerInPence = parseInt(cleanAnswer.replace(/p/i, ''));
        } else {
            // Assume pounds if just a number
            answerInPence = parseInt(cleanAnswer) * 100;
        }

        if (answerInPence === problem.change) {
            setFeedback('Correct! Well done! 🎉');
            setScore(score + 1);
            setTimeout(() => {
                generateProblem();
            }, 2000);
        } else {
            setFeedback('Not quite right. Try again!');
        }
    };

    // Initialize with first problem
    useEffect(() => {
        generateProblem();
    }, []);

    if (!problem) return null;

    return (
        <PageWrapper title="Money Calculations">
            <div className="score-container mb-5">
                <p className="text-center text-xl text-purple-700">
                    Score: <span className="font-bold text-pink-600">{score}</span> / {attempts}
                </p>
            </div>

            <div className="container max-w-3xl w-full bg-white rounded-3xl p-6 shadow-lg border-2 border-pink-200">
                <div className="problem-text mb-6 text-lg text-purple-700 bg-pink-50 p-4 rounded-xl">
                    <p className="font-bold">
                        {problem.name} has {formatMoney(problem.totalMoney)}.
                    </p>
                    <p className="mt-2">
                        {problem.name} buys:
                    </p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                        {problem.items.map((item, index) => (
                            <li key={index}>
                                a {item.name} for {item.price >= 100 ? formatMoney(item.price) : `${item.price}p`}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 font-bold">
                        How much change does {problem.name} get?
                    </p>
                </div>

                {showHint && (
                    <div className="hint bg-purple-100 p-3 rounded-lg mb-4 text-purple-700">
                        <strong>Hint:</strong> Total spent = {formatMoney(problem.totalSpent)}
                    </div>
                )}

                {feedback && (
                    <div className={`feedback text-center text-xl mb-4 ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-500'}`}>
                        {feedback}
                    </div>
                )}

                <div className="answer-section flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg text-purple-700">£</span>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                            placeholder="0.00"
                            className="px-4 py-2 text-xl border-2 border-pink-300 rounded-lg focus:outline-none focus:border-purple-400"
                            style={{ width: '120px' }}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowHint(true)}
                            className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg"
                        >
                            Show Hint
                        </button>
                        <button
                            onClick={checkAnswer}
                            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg"
                        >
                            Submit
                        </button>
                        <button
                            onClick={generateProblem}
                            className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg"
                        >
                            New Problem
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default MoneyCalculationApp;