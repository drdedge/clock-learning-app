import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, CheckCircle, XCircle, BookOpen, Target, Brain, Star, Award, Ruler, Shapes, Coins, BarChart3, Timer, Heart, Sparkles, Clock, Calculator, Globe, Pause, Play, AlarmClock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PageWrapper from '../shared/PageWrapper';
import { generateDynamicQuiz, questionBank } from '../../utils/questions';
import GraphVisualizer from '../visuals/GraphVisualizer';

const SevenPlusQuizApp = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [focusMode, setFocusMode] = useState('all');
    const [inputValue, setInputValue] = useState('');
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [answerTimes, setAnswerTimes] = useState({});
    
    // Timer mode states
    const [timerMode, setTimerMode] = useState(() => {
        const saved = localStorage.getItem('sevenPlusTimerMode');
        return saved === 'true';
    });
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [isPaused, setIsPaused] = useState(false);
    const [timedOutQuestions, setTimedOutQuestions] = useState({});
    const timerIntervalRef = useRef(null);

    // Generate questions based on focus mode
    const generateQuestions = useCallback(() => {
        // Reset the question bank for a new quiz
        questionBank.reset();
        return generateDynamicQuiz(focusMode, 20);
    }, [focusMode]);

    // Initialize questions on mount and when focus mode changes
    useEffect(() => {
        const newQuestions = generateQuestions();
        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        setInputValue('');
        setAnswerTimes({});
        setTimedOutQuestions({});
        setQuestionStartTime(Date.now());
        setTimeRemaining(60);
        setIsPaused(false);
    }, [focusMode, generateQuestions]);

    // Update question start time when navigating
    useEffect(() => {
        setQuestionStartTime(Date.now());
        if (timerMode && !showResults) {
            setTimeRemaining(60);
            setIsPaused(false);
        }
    }, [currentQuestion, timerMode, showResults]);

    // Timer countdown effect
    useEffect(() => {
        if (timerMode && !isPaused && !showResults && timeRemaining > 0) {
            timerIntervalRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        // Time's up - mark as timed out and auto-advance
                        handleTimeOut();
                        return 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        }

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        };
    }, [timerMode, isPaused, showResults, timeRemaining, currentQuestion]);

    // Save timer mode preference to localStorage
    useEffect(() => {
        localStorage.setItem('sevenPlusTimerMode', timerMode.toString());
    }, [timerMode]);

    const handleTimeOut = () => {
        setTimedOutQuestions(prev => ({
            ...prev,
            [currentQuestion]: true
        }));
        
        // Auto-advance to next question or show results
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        } else {
            setShowResults(true);
        }
    };

    const toggleTimerMode = () => {
        setTimerMode(prev => !prev);
        setTimeRemaining(60);
        setIsPaused(false);
    };

    const togglePause = () => {
        setIsPaused(prev => !prev);
    };

    const handleAnswer = (value) => {
        const timeSpent = (Date.now() - questionStartTime) / 1000; // Convert to seconds
        const current = questions[currentQuestion];
        
        if (!current) return;

        if (current.inputType === 'multiple-choice') {
            setUserAnswers({
                ...userAnswers,
                [currentQuestion]: parseInt(value)
            });
            setAnswerTimes({
                ...answerTimes,
                [currentQuestion]: timeSpent
            });
        } else if (current.inputType === 'text') {
            // For text answers (like time format, shape names)
            setInputValue(value);
            setUserAnswers({
                ...userAnswers,
                [currentQuestion]: value
            });
            setAnswerTimes({
                ...answerTimes,
                [currentQuestion]: timeSpent
            });
        } else {
            // For number answers
            if (value === '' || (!isNaN(value) && parseInt(value) >= 0)) {
                setInputValue(value);
                if (value !== '') {
                    setUserAnswers({
                        ...userAnswers,
                        [currentQuestion]: parseInt(value)
                    });
                    setAnswerTimes({
                        ...answerTimes,
                        [currentQuestion]: timeSpent
                    });
                }
            }
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            const nextQ = questions[currentQuestion + 1];
            if (nextQ && (nextQ.inputType === 'number' || nextQ.inputType === 'text')) {
                setInputValue(userAnswers[currentQuestion + 1]?.toString() || '');
            }
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            const prevQ = questions[currentQuestion - 1];
            if (prevQ && (prevQ.inputType === 'number' || prevQ.inputType === 'text')) {
                setInputValue(userAnswers[currentQuestion - 1]?.toString() || '');
            }
        }
    };

    const calculateResults = () => {
        const results = {};
        let totalCorrect = 0;

        questions.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            let correct = false;
            
            if (q.inputType === 'text') {
                // For text answers, compare case-insensitively
                correct = userAnswer?.toString().toLowerCase() === q.answer?.toString().toLowerCase();
            } else {
                correct = userAnswer === q.answer;
            }
            
            if (correct) totalCorrect++;

            if (!results[q.category]) {
                results[q.category] = { correct: 0, total: 0 };
            }
            results[q.category].total++;
            if (correct) results[q.category].correct++;
        });

        return { categoryResults: results, totalCorrect, totalQuestions: questions.length };
    };

    const resetQuiz = () => {
        const newQuestions = generateQuestions();
        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        setInputValue('');
        setAnswerTimes({});
        setTimedOutQuestions({});
        setQuestionStartTime(Date.now());
        setTimeRemaining(60);
        setIsPaused(false);
    };

    // Clock display component for clock questions
    const ClockDisplay = ({ hour, minute }) => {
        const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
        const minuteAngle = minute * 6;
        
        return (
            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto my-4">
                <circle cx="60" cy="60" r="58" fill="white" stroke="#ec4899" strokeWidth="4"/>
                {[12, 3, 6, 9].map((num, i) => (
                    <text key={num} x={60 + (i % 2 === 1 ? (i === 1 ? 40 : -40) : 0)} 
                          y={60 + (i < 2 ? -40 : 40) + 6} 
                          textAnchor="middle" fontSize="14" fontWeight="bold" fill="#be185d">
                        {num}
                    </text>
                ))}
                <line x1="60" y1="60" x2="60" y2="25" 
                      stroke="#be185d" strokeWidth="4" strokeLinecap="round"
                      transform={`rotate(${hourAngle} 60 60)`}/>
                <line x1="60" y1="60" x2="60" y2="15" 
                      stroke="#a855f7" strokeWidth="3" strokeLinecap="round"
                      transform={`rotate(${minuteAngle} 60 60)`}/>
                <circle cx="60" cy="60" r="4" fill="#ec4899"/>
            </svg>
        );
    };

    if (showResults) {
        const { categoryResults, totalCorrect, totalQuestions } = calculateResults();
        const percentage = Math.round((totalCorrect / totalQuestions) * 100);

        // Prepare data for charts
        const categoryData = Object.entries(categoryResults).map(([category, result]) => ({
            category: category,
            correct: result.correct,
            incorrect: result.total - result.correct,
            percentage: Math.round((result.correct / result.total) * 100)
        }));

        const speedData = questions.map((q, index) => ({
            question: `Q${index + 1}`,
            time: answerTimes[index] || 0,
            correct: userAnswers[index] === q.answer || 
                     (q.inputType === 'text' && userAnswers[index]?.toString().toLowerCase() === q.answer?.toString().toLowerCase())
        }));

        const averageTime = Object.values(answerTimes).length > 0
            ? (Object.values(answerTimes).reduce((a, b) => a + b, 0) / Object.values(answerTimes).length).toFixed(1)
            : 0;

        return (
            <PageWrapper>
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4 relative">
                                <div className="absolute -left-8 top-8">
                                    <Heart className="w-16 h-16 text-pink-300 fill-current animate-pulse" />
                                </div>
                                <div className="absolute -right-8 top-8">
                                    <Sparkles className="w-16 h-16 text-purple-300 animate-pulse" />
                                </div>
                                {percentage >= 90 ? (
                                    <Award className="w-24 h-24 text-yellow-500" />
                                ) : percentage >= 70 ? (
                                    <Star className="w-24 h-24 text-purple-500" />
                                ) : (
                                    <CheckCircle className="w-24 h-24 text-pink-500" />
                                )}
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                {percentage >= 90 ? "Outstanding! 🎆" : percentage >= 70 ? "Well Done! 🎉" : "Good Effort! 💖"}
                            </h1>
                            <p className="text-2xl font-bold text-purple-700">
                                You got {totalCorrect} out of {totalQuestions} correct ({percentage}%)
                            </p>
                            <p className="text-lg text-pink-600 mt-2 font-medium">
                                ⏱️ Average time per question: {averageTime} seconds
                            </p>
                        </div>

                        {/* Performance Charts */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Category Performance Chart */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5" />
                                    Performance by Category
                                </h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={categoryData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="percentage" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.percentage >= 80 ? '#10b981' : entry.percentage >= 60 ? '#3b82f6' : '#ef4444'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Speed Chart */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Timer className="w-5 h-5" />
                                    Answer Speed (seconds)
                                </h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={speedData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="question" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="time"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            dot={{ fill: '#8b5cf6', r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Results by Category:</h2>
                            <div className="space-y-3">
                                {Object.entries(categoryResults).map(([category, result]) => (
                                    <div key={category} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-700">{category}</span>
                                            <span className="text-lg">
                                                {result.correct}/{result.total} correct ({Math.round((result.correct / result.total) * 100)}%)
                                            </span>
                                        </div>
                                        <div className="mt-2 bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${(result.correct / result.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Question Review:</h2>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {questions.map((q, index) => {
                                    const userAnswer = userAnswers[index];
                                    const correct = q.inputType === 'text' 
                                        ? userAnswer?.toString().toLowerCase() === q.answer?.toString().toLowerCase()
                                        : userAnswer === q.answer;
                                    const timeSpent = answerTimes[index];
                                    const wasTimedOut = timedOutQuestions[index];

                                    return (
                                        <div key={index} className={`p-4 rounded-lg border-2 ${wasTimedOut ? 'bg-orange-50 border-orange-300' : correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                                            <div className="flex items-start gap-3">
                                                {wasTimedOut ? (
                                                    <AlarmClock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                                                ) : correct ? (
                                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                                ) : (
                                                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800 mb-2 whitespace-pre-line">Q{index + 1}: {q.question}</p>
                                                    <div className="flex gap-4 text-sm">
                                                        {q.inputType === 'multiple-choice' ? (
                                                            <>
                                                                <span>Your answer: <strong>{userAnswer !== undefined ? q.options[userAnswer] : 'No answer'}</strong></span>
                                                                {!correct && <span>Correct answer: <strong>{q.correctAnswer}</strong></span>}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>Your answer: <strong>{userAnswer !== undefined ? userAnswer : 'No answer'}</strong></span>
                                                                {!correct && <span>Correct answer: <strong>{q.answer}</strong> {q.unit ? q.unit : ''}</span>}
                                                            </>
                                                        )}
                                                        {timeSpent && <span className="text-gray-500">Time: {timeSpent.toFixed(1)}s</span>}
                                                        {wasTimedOut && <span className="text-orange-600 font-bold">Timed Out</span>}
                                                    </div>
                                                    {!correct && q.tip && (
                                                        <p className="text-sm text-gray-600 mt-2 italic">💡 Tip: {q.tip}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {percentage < 70 && (
                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                <h3 className="font-bold text-blue-900 mb-2">Keep Practicing!</h3>
                                <p className="text-blue-800">Try focusing on specific topics using the practice mode selector. Each question type builds important math skills!</p>
                            </div>
                        )}

                        <button
                            onClick={resetQuiz}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Try New Questions 🎆
                        </button>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    const current = questions[currentQuestion];
    if (!current) return null;

    // Get icon for category
    const getCategoryIcon = (category) => {
        switch(category) {
            case "Shapes": return <Shapes className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
            case "Money": 
            case "Money Problems": return <Coins className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
            case "Measurement": return <Ruler className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
            case "Time": return <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
            case "Algebra": return <Calculator className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
            case "Graphs": return <BarChart3 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
            case "Real World": return <Globe className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
            default: return <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />;
        }
    };

    return (
        <PageWrapper>
            <div className="max-w-4xl w-full mx-auto">
                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
                    {/* Header with decorative elements */}
                    <div className="relative mb-6">
                        <div className="absolute -top-4 -left-4 text-pink-300">
                            <Heart className="w-12 h-12 fill-current" />
                        </div>
                        <div className="absolute -top-4 -right-4 text-purple-300">
                            <Sparkles className="w-10 h-10" />
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                                <Brain className="w-10 h-10 text-purple-600" />
                                7+ Math Practice ✨
                            </h1>
                            <button
                                onClick={resetQuiz}
                                className="bg-pink-100 hover:bg-pink-200 text-pink-600 p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                                title="Start over"
                            >
                                <RotateCcw className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Focus Mode Selector and Timer Toggle */}
                    <div className="mb-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Practice Mode:</label>
                        <select
                            value={focusMode}
                            onChange={(e) => setFocusMode(e.target.value)}
                            className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none bg-pink-50 font-medium"
                        >
                            <option value="all">🌟 All Question Types</option>
                            <option value="7plus">🎯 7+ Challenge (Advanced Mix)</option>
                            <option value="wordProblems">📖 Word Problems</option>
                            <option value="time">🕐 Time & Clock Problems</option>
                            <option value="algebra">🔢 Symbol Algebra & Patterns</option>
                            <option value="shapes">🔷 2D & 3D Shapes</option>
                            <option value="graphs">📊 Graph Reading</option>
                            <option value="measurement">📏 Measurement & Conversions</option>
                            <option value="realWorld">🌍 Real World Comparisons</option>
                            <option value="money">💰 Money & Change</option>
                            <option value="fractions">🍰 Fractions</option>
                            <option value="numberBonds">🔗 Number Bonds</option>
                            <option value="placeValue">🎲 Place Value</option>
                            <option value="patterns">🔄 Number Patterns</option>
                            <option value="mentalMath">🧮 Mental Math</option>
                            <option value="advanced">🚀 Advanced Problems</option>
                        </select>
                        </div>
                        
                        {/* Timer Mode Toggle */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border-2 border-purple-200">
                            <div className="flex items-center gap-3">
                                <Timer className="w-6 h-6 text-purple-600" />
                                <div>
                                    <span className="font-bold text-purple-800">Timer Mode</span>
                                    <p className="text-sm text-gray-600">60 seconds per question</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleTimerMode}
                                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                                    timerMode ? 'bg-purple-600' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                        timerMode ? 'translate-x-9' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Timer Display (when timer mode is active) */}
                    {timerMode && (
                        <div className="mb-4">
                            <div className={`relative overflow-hidden rounded-xl border-2 ${
                                timeRemaining <= 10 ? 'border-red-400 animate-pulse' : 'border-purple-300'
                            }`}>
                                <div className="flex items-center justify-between p-3 bg-white relative z-10">
                                    <div className="flex items-center gap-2">
                                        <AlarmClock className={`w-5 h-5 ${
                                            timeRemaining <= 10 ? 'text-red-600 animate-bounce' : 'text-purple-600'
                                        }`} />
                                        <span className={`font-bold text-lg ${
                                            timeRemaining <= 10 ? 'text-red-600' : 'text-purple-700'
                                        }`}>
                                            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                                        </span>
                                    </div>
                                    <button
                                        onClick={togglePause}
                                        className="p-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors"
                                        title={isPaused ? "Resume timer" : "Pause timer"}
                                    >
                                        {isPaused ? (
                                            <Play className="w-4 h-4 text-purple-600" />
                                        ) : (
                                            <Pause className="w-4 h-4 text-purple-600" />
                                        )}
                                    </button>
                                </div>
                                <div className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-purple-200 to-pink-200 transition-all duration-1000 ease-linear"
                                     style={{ width: `${(timeRemaining / 60) * 100}%` }}
                                />
                            </div>
                            {timeRemaining <= 10 && (
                                <p className="text-center text-red-600 font-bold mt-2 animate-pulse">
                                    ⚠️ Hurry! Time is running out!
                                </p>
                            )}
                        </div>
                    )}

                    {/* Progress Bar with stars */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                        <div className="flex justify-between text-sm font-medium mb-2">
                            <span className="text-pink-700">✨ Question {currentQuestion + 1} of {questions.length}</span>
                            <span className="text-purple-700">{Object.keys(userAnswers).length} answered 🌟</span>
                        </div>
                        <div className="bg-pink-200 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-500 shadow-inner"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Question Display with decorative border */}
                    <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 mb-6 border-2 border-purple-200 shadow-lg relative overflow-hidden min-h-48 flex flex-col justify-between w-full">
                        <div className="absolute top-0 right-0 text-pink-200 opacity-30">
                            <Star className="w-24 h-24" />
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            {getCategoryIcon(current.category)}
                            <div className="flex-1">
                                <p className="text-2xl font-bold text-gray-800 leading-relaxed relative z-10 whitespace-pre-line">
                                    {current.question}
                                </p>
                                {/* Display clock if it's a clock question */}
                                {current.clockTime && (
                                    <ClockDisplay hour={current.clockTime.hour} minute={current.clockTime.minute} />
                                )}
                                {/* Display graph if it's a graph question */}
                                {current.visual && (
                                    <div className="mt-4">
                                        <GraphVisualizer 
                                            graphType={current.visual.graphType} 
                                            graphData={current.visual.graphData} 
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-2 bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800 rounded-full text-sm font-bold shadow-md">
                                {current.category}
                            </span>
                            <span className="px-4 py-2 bg-gradient-to-r from-pink-200 to-pink-300 text-pink-800 rounded-full text-sm font-bold shadow-md">
                                {current.skill}
                            </span>
                        </div>
                    </div>

                    {/* Answer Input */}
                    <div className="mb-6">
                        {current.inputType === 'multiple-choice' ? (
                            <>
                                <label className="block text-lg font-bold text-purple-700 mb-3">🌸 Choose your answer:</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {current.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(index)}
                                            className={`p-4 text-lg border-2 rounded-xl font-bold transition-all transform hover:scale-105 ${
                                                userAnswers[currentQuestion] === index
                                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-lg'
                                                    : 'bg-white text-gray-700 border-pink-300 hover:border-purple-400 hover:bg-pink-50'
                                            }`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <label className="block text-lg font-bold text-purple-700 mb-2">
                                    💖 Your Answer {current.unit ? `(in ${current.unit})` : ''}:
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => handleAnswer(e.target.value)}
                                    className="w-full p-4 text-2xl border-2 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none text-center font-bold bg-pink-50 shadow-inner"
                                    placeholder={current.inputType === 'text' ? "Type your answer" : "Enter a number"}
                                />
                            </>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={previousQuestion}
                            disabled={currentQuestion === 0}
                            className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform ${
                                currentQuestion === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-pink-200 text-pink-700 hover:bg-pink-300 hover:scale-105 shadow-md'
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Previous
                        </button>

                        {currentQuestion === questions.length - 1 ? (
                            <button
                                onClick={() => setShowResults(true)}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                <Target className="w-5 h-5" />
                                See Results
                            </button>
                        ) : (
                            <button
                                onClick={nextQuestion}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default SevenPlusQuizApp;