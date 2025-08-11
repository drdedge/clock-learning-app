import React, { useState } from 'react';
import { X, Download, FileText, CheckSquare, BookOpen, Sparkles } from 'lucide-react';
import { generateExamPDF } from '../../utils/examExporter';

const ExamExportModal = ({ isOpen, onClose }) => {
  const [examConfig, setExamConfig] = useState({
    examTitle: 'Mathematics Practice Exam',
    studentName: '',
    questionCount: 25,
    focusMode: 'all',
    includeAnswerKey: true,
    timeAllowed: '60 minutes'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);
  
  if (!isOpen) return null;
  
  const handleInputChange = (field, value) => {
    setExamConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleGenerateExam = async () => {
    setIsGenerating(true);
    setGenerationSuccess(false);
    
    try {
      // Generate the PDF
      const result = await generateExamPDF(examConfig);
      
      if (result.success) {
        setGenerationSuccess(true);
        
        // Auto-close after 3 seconds
        setTimeout(() => {
          setGenerationSuccess(false);
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error generating exam:', error);
      alert('Failed to generate exam. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const focusModes = [
    { value: 'all', label: '🌟 All Question Types' },
    { value: '7plus', label: '🎯 7+ Challenge' },
    { value: 'wordProblems', label: '📖 Word Problems' },
    { value: 'time', label: '🕐 Time & Clock' },
    { value: 'algebra', label: '🔢 Algebra' },
    { value: 'shapes', label: '🔷 Shapes' },
    { value: 'graphs', label: '📊 Graphs' },
    { value: 'measurement', label: '📏 Measurement' },
    { value: 'money', label: '💰 Money' },
    { value: 'fractions', label: '🍰 Fractions' }
  ];
  
  const questionCounts = [10, 15, 20, 25, 30, 40, 50];
  const timeOptions = ['30 minutes', '45 minutes', '60 minutes', '90 minutes', '120 minutes'];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10 text-white" />
            <div>
              <h2 className="text-3xl font-bold text-white">Generate Exam</h2>
              <p className="text-white/90 text-sm">Create a printable PDF exam</p>
            </div>
          </div>
        </div>
        
        {/* Success Message */}
        {generationSuccess && (
          <div className="bg-green-100 border-2 border-green-400 rounded-xl m-6 p-4 flex items-center gap-3">
            <CheckSquare className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-bold text-green-800">Exam Generated Successfully!</p>
              <p className="text-sm text-green-700">The PDF has been downloaded to your device.</p>
            </div>
          </div>
        )}
        
        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Exam Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Exam Title
            </label>
            <input
              type="text"
              value={examConfig.examTitle}
              onChange={(e) => handleInputChange('examTitle', e.target.value)}
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none"
              placeholder="Enter exam title..."
            />
          </div>
          
          {/* Student Name (Optional) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Student Name (Optional)
            </label>
            <input
              type="text"
              value={examConfig.studentName}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none"
              placeholder="Leave blank for students to fill in..."
            />
          </div>
          
          {/* Question Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Question Category
            </label>
            <select
              value={examConfig.focusMode}
              onChange={(e) => handleInputChange('focusMode', e.target.value)}
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none bg-white"
            >
              {focusModes.map(mode => (
                <option key={mode.value} value={mode.value}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Number of Questions and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Number of Questions
              </label>
              <select
                value={examConfig.questionCount}
                onChange={(e) => handleInputChange('questionCount', parseInt(e.target.value))}
                className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none bg-white"
              >
                {questionCounts.map(count => (
                  <option key={count} value={count}>
                    {count} questions
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Time Allowed
              </label>
              <select
                value={examConfig.timeAllowed}
                onChange={(e) => handleInputChange('timeAllowed', e.target.value)}
                className="w-full p-3 border-2 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none bg-white"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Include Answer Key */}
          <div className="bg-purple-50 rounded-xl p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={examConfig.includeAnswerKey}
                onChange={(e) => handleInputChange('includeAnswerKey', e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div className="flex-1">
                <span className="font-bold text-gray-700">Include Answer Key</span>
                <p className="text-sm text-gray-600">
                  Adds a separate page with all answers for teacher reference
                </p>
              </div>
            </label>
          </div>
          
          {/* Exam Preview Info */}
          <div className="bg-pink-50 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Exam Preview
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Cover page with exam details and instructions</p>
              <p>• {examConfig.questionCount} randomly generated questions</p>
              <p>• Space for working and answers</p>
              {examConfig.includeAnswerKey && <p>• Answer key on separate page</p>}
              <p>• Professional formatting for printing</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            
            <button
              onClick={handleGenerateExam}
              disabled={isGenerating}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 shadow-lg'
              }`}
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Generate PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamExportModal;