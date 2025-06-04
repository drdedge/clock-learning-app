import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, CheckCircle, XCircle, BookOpen, Target, Brain, Star, Award, Ruler, Shapes, Coins, BarChart3, Timer, Heart, Sparkles } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PageWrapper from '../shared/PageWrapper';
import { questionGenerators, getGeneratorsForFocusMode } from '../../utils/questions';

const SevenPlusQuizApp = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [focusMode, setFocusMode] = useState('all');
    const [inputValue, setInputValue] = useState('');
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [answerTimes, setAnswerTimes] = useState({});

    // Generate questions based on focus mode
    const generateQuestions = useCallback(() => {
        const questionCount = 20;
        const generatedQuestions = [];

        // Get active generators based on focus mode
        const activeGenerators = getGeneratorsForFocusMode(focusMode);

        for (let i = 0; i < questionCount; i++) {
            const generatorName = activeGenerators[Math.floor(Math.random() * activeGenerators.length)];
            const question = questionGenerators[generatorName]();
            generatedQuestions.push({
                id: i,
                type: generatorName,
                ...question
            });
        }

        return generatedQuestions;
    }, [focusMode]);

    // Initialize questions on mount and when focus mode changes
    useEffect(() => {
        setQuestions(generateQuestions());
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        setInputValue('');
        setAnswerTimes({});
        setQuestionStartTime(Date.now());
    }, [focusMode, generateQuestions]);

    // Update question start time when navigating
    useEffect(() => {
        setQuestionStartTime(Date.now());
    }, [currentQuestion]);

    const handleAnswer = (value) => {
        const timeSpent = (Date.now() - questionStartTime) / 1000; // Convert to seconds

        if (questions[currentQuestion].inputType === 'multiple-choice') {
            setUserAnswers({
                ...userAnswers,
                [currentQuestion]: parseInt(value)
            });
            setAnswerTimes({
                ...answerTimes,
                [currentQuestion]: timeSpent
            });
        } else {
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
            if (nextQ.inputType === 'number') {
                setInputValue(userAnswers[currentQuestion + 1]?.toString() || '');
            }
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            const prevQ = questions[currentQuestion - 1];
            if (prevQ.inputType === 'number') {
                setInputValue(userAnswers[currentQuestion - 1]?.toString() || '');
            }
        }
    };

    const calculateResults = () => {
        const results = {};
        let totalCorrect = 0;

        questions.forEach((q, index) => {
            const userAnswer = userAnswers[index];
            const correct = userAnswer === q.answer;
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
        setQuestions(generateQuestions());
        setCurrentQuestion(0);
        setUserAnswers({});
        setShowResults(false);
        setInputValue('');
        setAnswerTimes({});
        setQuestionStartTime(Date.now());
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
            correct: userAnswers[index] === q.answer
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
                                    const correct = userAnswer === q.answer;
                                    const timeSpent = answerTimes[index];

                                    return (
                                        <div key={q.id} className={`p-4 rounded-lg border-2 ${correct ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                                            <div className="flex items-start gap-3">
                                                {correct ? (
                                                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                                ) : (
                                                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-800 mb-2">Q{index + 1}: {q.question}</p>
                                                    <div className="flex gap-4 text-sm">
                                                        {q.inputType === 'multiple-choice' ? (
                                                            <>
                                                                <span>Your answer: <strong>{userAnswer !== undefined ? q.options[userAnswer] : 'No answer'}</strong></span>
                                                                {!correct && <span>Correct answer: <strong>{q.correctAnswer}</strong></span>}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span>Your answer: <strong>{userAnswer !== undefined ? userAnswer : 'No answer'}</strong></span>
                                                                {!correct && <span>Correct answer: <strong>{q.answer}</strong></span>}
                                                            </>
                                                        )}
                                                        {timeSpent && <span className="text-gray-500">Time: {timeSpent.toFixed(1)}s</span>}
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
                                <p className="text-blue-800">Focus on word problems - they help you understand when to use different math skills in real life!</p>
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

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto">
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

                    {/* Focus Mode Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Practice Mode:</label>
                        <select
                            value={focusMode}
                            onChange={(e) => setFocusMode(e.target.value)}
                            className="w-full p-3 border-3 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none bg-pink-50 font-medium"
                        >
                            <option value="all">All Question Types</option>
                            <option value="wordProblems">Word Problems (Reading & Math)</option>
                            <option value="numberBonds">Number Bonds (to 10, 20, 50, 100)</option>
                            <option value="placeValue">Place Value</option>
                            <option value="patterns">Number Patterns & Sequences</option>
                            <option value="shapes">Shapes (Properties & Identification)</option>
                            <option value="measurement">Measurement & Units</option>
                            <option value="money">Money & Change</option>
                            <option value="mentalMath">Mental Math Strategies</option>
                            <option value="fractions">Fractions</option>
                        </select>
                    </div>

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
                    <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 mb-6 border-3 border-purple-200 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-pink-200 opacity-30">
                            <Star className="w-24 h-24" />
                        </div>
                        <div className="flex items-start gap-3 mb-4">
                            {current.category === "Shapes" && <Shapes className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />}
                            {current.category === "Money Problems" && <Coins className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />}
                            {current.category === "Measurement" && <Ruler className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />}
                            {!["Shapes", "Money Problems", "Measurement"].includes(current.category) && <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />}
                            <div className="flex-1">
                                <p className="text-2xl font-bold text-gray-800 leading-relaxed relative z-10">
                                    {current.question}
                                </p>
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
                                            className={`p-4 text-lg border-3 rounded-xl font-bold transition-all transform hover:scale-105 ${userAnswers[currentQuestion] === index
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
                                <label className="block text-lg font-bold text-purple-700 mb-2">💖 Your Answer:</label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => handleAnswer(e.target.value)}
                                    className="w-full p-4 text-2xl border-3 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none text-center font-bold bg-pink-50 shadow-inner"
                                    placeholder="Type your answer"
                                />
                            </>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={previousQuestion}
                            disabled={currentQuestion === 0}
                            className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform ${currentQuestion === 0
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