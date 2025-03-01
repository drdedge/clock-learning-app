import React, { useState, useEffect } from 'react';

const ClockLearningApp = () => {
    const [targetTime, setTargetTime] = useState({ hour: 8, minute: 45 });
    const [userTime, setUserTime] = useState({ hour: 0, minute: 0 });
    const [feedback, setFeedback] = useState('');
    const [showCorrect, setShowCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    // Convert time to word format
    const timeToWords = (hour, minute) => {
        const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const nextHour = (h % 12) + 1;

        if (minute === 0) return `${h} o'clock`;
        if (minute === 15) return `quarter past ${h}`;
        if (minute === 30) return `half past ${h}`;
        if (minute === 45) return `quarter to ${nextHour}`;

        // For 5-minute increments
        if (minute === 5) return `five past ${h}`;
        if (minute === 10) return `ten past ${h}`;
        if (minute === 20) return `twenty past ${h}`;
        if (minute === 25) return `twenty-five past ${h}`;
        if (minute === 35) return `twenty-five to ${nextHour}`;
        if (minute === 40) return `twenty to ${nextHour}`;
        if (minute === 50) return `ten to ${nextHour}`;
        if (minute === 55) return `five to ${nextHour}`;

        // Catch-all for any other minutes
        if (minute < 30) return `${minute} minutes past ${h}`;
        return `${60 - minute} minutes to ${nextHour}`;
    };

    // Generate a new random time
    const generateNewTime = () => {
        // Generate random hours (1-12) and minutes in 5-minute increments
        const hours = Math.floor(Math.random() * 12) + 1;

        // Create an array of minutes in 5-minute increments (0, 5, 10, 15, ..., 55)
        const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5);
        const minutes = minuteOptions[Math.floor(Math.random() * minuteOptions.length)];

        setTargetTime({ hour: hours, minute: minutes });
        setUserTime({ hour: 0, minute: 0 });
        setFeedback('');
        setShowCorrect(false);
    };

    // Handle hour increment/decrement
    const adjustHour = (increment) => {
        setUserTime(prev => {
            let newHour = (prev.hour + increment) % 12;
            if (newHour < 0) newHour = 11;
            if (newHour === 0) newHour = 12;
            return { ...prev, hour: newHour };
        });
    };

    // Handle minute increment/decrement
    const adjustMinute = (increment) => {
        setUserTime(prev => {
            let newMinute = (prev.minute + increment) % 60;
            if (newMinute < 0) newMinute = 55;
            return { ...prev, minute: newMinute };
        });
    };

    // Check if the user's answer is correct
    const checkAnswer = () => {
        setAttempts(attempts + 1);

        const hourCorrect = userTime.hour === targetTime.hour ||
            (userTime.hour === 12 && targetTime.hour === 0) ||
            (userTime.hour === 0 && targetTime.hour === 12);

        // For minutes, we need to be more precise
        const minuteCorrect = userTime.minute === targetTime.minute;

        if (hourCorrect && minuteCorrect) {
            setFeedback('Correct! Great job! 🎉');
            setScore(score + 1);
            setTimeout(() => {
                generateNewTime();
            }, 2000);
        } else {
            setFeedback('Not quite right. Try again!');
        }
    };

    // Show the correct answer
    const showAnswer = () => {
        setShowCorrect(true);
        setUserTime(targetTime);
        setFeedback(`The correct answer is ${timeToWords(targetTime.hour || 12, targetTime.minute)}`);
    };

    // Initialize with a random time
    useEffect(() => {
        generateNewTime();
    }, []);

    // Calculate hand rotations
    const hourRotation = ((userTime.hour || 12) % 12) * 30 + (userTime.minute / 2);
    const minuteRotation = userTime.minute * 6;

    // Calculate hand rotations for correct answer
    const correctHourRotation = ((targetTime.hour || 12) % 12) * 30 + (targetTime.minute / 2);
    const correctMinuteRotation = targetTime.minute * 6;

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 bg-blue-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Clock Learning Game</h1>

            <div className="bg-white p-4 rounded-lg shadow-md w-full mb-6">
                <h2 className="text-xl font-semibold text-center mb-2">Set the clock to:</h2>
                <div className="flex justify-center text-2xl font-bold">
                    <p className="bg-green-100 p-2 rounded">{timeToWords(targetTime.hour || 12, targetTime.minute)}</p>
                </div>
            </div>

            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-lg border-4 border-blue-400 mb-6">
                {/* Clock numbers */}
                {[...Array(12)].map((_, i) => {
                    const rotation = i * 30;
                    const angle = rotation * Math.PI / 180;
                    const numberRadius = 40; // percentage of clock radius
                    const x = 50 + numberRadius * Math.sin(angle);
                    const y = 50 - numberRadius * Math.cos(angle);

                    return (
                        <span
                            key={i}
                            className="absolute text-xl font-bold"
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {i === 0 ? 12 : i}
                        </span>
                    );
                })}

                {/* Minute markers */}
                {[...Array(60)].map((_, i) => {
                    if (i % 5 === 0) return null; // Skip where numbers are

                    const rotation = i * 6;
                    const angle = rotation * Math.PI / 180;
                    const markerOuterRadius = 48; // percentage of clock radius
                    const markerInnerRadius = 45; // percentage of clock radius
                    const outerX = 50 + markerOuterRadius * Math.sin(angle);
                    const outerY = 50 - markerOuterRadius * Math.cos(angle);
                    const innerX = 50 + markerInnerRadius * Math.sin(angle);
                    const innerY = 50 - markerInnerRadius * Math.cos(angle);

                    return (
                        <div
                            key={i}
                            className="absolute bg-gray-400"
                            style={{
                                width: '1px',
                                height: '1px',
                                left: `${innerX}%`,
                                top: `${innerY}%`,
                                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                                transformOrigin: `${outerX - innerX + 50}% ${outerY - innerY + 50}%`,
                                width: '1px',
                                height: `${markerOuterRadius - markerInnerRadius}%`
                            }}
                        />
                    );
                })}

                {/* Center dot */}
                <div className="absolute w-4 h-4 bg-black rounded-full" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 30 }}></div>

                {/* Hour hand */}
                <div
                    className="absolute w-1 bg-black rounded-full"
                    style={{
                        height: '30%',
                        left: '50%',
                        bottom: '50%',
                        transformOrigin: 'bottom center',
                        transform: `translateX(-50%) rotate(${hourRotation}deg)`,
                        zIndex: 10
                    }}
                />

                {/* Minute hand */}
                <div
                    className="absolute w-1 bg-black rounded-full"
                    style={{
                        height: '40%',
                        left: '50%',
                        bottom: '50%',
                        transformOrigin: 'bottom center',
                        transform: `translateX(-50%) rotate(${minuteRotation}deg)`,
                        zIndex: 20
                    }}
                />

                {/* Show correct answer overlay */}
                {showCorrect && (
                    <>
                        <div
                            className="absolute w-1 bg-green-500 rounded-full"
                            style={{
                                height: '30%',
                                left: '50%',
                                bottom: '50%',
                                transformOrigin: 'bottom center',
                                transform: `translateX(-50%) rotate(${correctHourRotation}deg)`,
                                zIndex: 5,
                                opacity: 0.7
                            }}
                        />
                        <div
                            className="absolute w-1 bg-green-500 rounded-full"
                            style={{
                                height: '40%',
                                left: '50%',
                                bottom: '50%',
                                transformOrigin: 'bottom center',
                                transform: `translateX(-50%) rotate(${correctMinuteRotation}deg)`,
                                zIndex: 5,
                                opacity: 0.7
                            }}
                        />
                    </>
                )}
            </div>

            {/* Clock controls */}
            <div className="flex w-full justify-around mb-6">
                <div className="flex flex-col items-center">
                    <h3 className="font-bold mb-2">Hour Hand</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => adjustHour(-1)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l"
                        >
                            ←
                        </button>
                        <span className="bg-white py-2 px-4 border-t border-b font-bold">{userTime.hour || 12}</span>
                        <button
                            onClick={() => adjustHour(1)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="font-bold mb-2">Minute Hand</h3>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => adjustMinute(-5)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l"
                        >
                            ←
                        </button>
                        <span className="bg-white py-2 px-4 border-t border-b font-bold">{userTime.minute.toString().padStart(2, '0')}</span>
                        <button
                            onClick={() => adjustMinute(5)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-xl mb-4 text-center">
                <span className="text-lg font-bold">{timeToWords(userTime.hour || 12, userTime.minute)}</span>
            </div>

            {feedback && (
                <div className={`text-xl font-bold mb-4 ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-500'}`}>
                    {feedback}
                </div>
            )}

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={checkAnswer}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Check Answer
                </button>
                <button
                    onClick={generateNewTime}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    New Question
                </button>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg shadow w-full text-center">
                <p className="text-lg">
                    Score: <span className="font-bold text-green-600">{score}</span> / {attempts}
                </p>
            </div>

            <div className="mt-6 text-sm text-gray-600">
                <p>Use the arrow buttons to adjust the hour and minute hands.</p>
            </div>
        </div>
    );
};

export default ClockLearningApp;