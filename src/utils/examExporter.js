import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { generateDynamicQuiz, questionBank } from './questions';

// Convert visual questions to text format for PDF
const formatQuestionForPDF = (question, index) => {
  let formattedQuestion = question.question;
  
  // Handle clock questions - remove visual clock reference
  if (question.clockTime) {
    const { hour, minute } = question.clockTime;
    const timeString = `${hour}:${minute.toString().padStart(2, '0')}`;
    formattedQuestion = `A clock shows ${timeString}. ${question.question}`;
  }
  
  // Handle graph questions - convert to text representation
  if (question.visual && question.visual.graphType) {
    const { graphType, graphData } = question.visual;
    
    switch (graphType) {
      case 'bar':
        if (graphData.items) {
          // Bar graph data is already included in the question text
          formattedQuestion = formattedQuestion.replace(/\n/g, ' | ');
        }
        break;
        
      case 'tally':
        // Tally marks are already in text format
        formattedQuestion = formattedQuestion.replace(/│/g, '|').replace(/╱/g, '/');
        break;
        
      case 'pictogram':
        // Convert pictogram symbols to text
        formattedQuestion = formattedQuestion.replace(/⭐/g, '*');
        break;
        
      default:
        // Keep as is for other graph types
        break;
    }
  }
  
  // Format the question with proper numbering
  return {
    number: index + 1,
    question: formattedQuestion.replace(/\n/g, ' '),
    answer: question.answer,
    options: question.options,
    inputType: question.inputType,
    unit: question.unit,
    category: question.category,
    skill: question.skill
  };
};

// Generate exam questions
export const generateExamQuestions = (config = {}) => {
  const {
    focusMode = 'all',
    questionCount = 25
  } = config;
  
  // Reset question bank for unique questions
  questionBank.reset();
  
  // Generate questions using existing system
  const questions = generateDynamicQuiz(focusMode, questionCount);
  
  // Format questions for PDF
  return questions.map((q, index) => formatQuestionForPDF(q, index));
};

// Add cover page to PDF
const addCoverPage = (pdf, config) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Add decorative header
  pdf.setFillColor(236, 72, 153); // pink-500
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont(undefined, 'bold');
  pdf.text('7+ Mathematics Assessment', pageWidth / 2, 25, { align: 'center' });
  
  // Reset text color
  pdf.setTextColor(0, 0, 0);
  
  // Exam details section
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'normal');
  pdf.text(config.examTitle || 'Practice Exam', pageWidth / 2, 60, { align: 'center' });
  
  // Student info box
  pdf.setDrawColor(168, 85, 247); // purple-500
  pdf.setLineWidth(1);
  pdf.rect(30, 80, pageWidth - 60, 60);
  
  pdf.setFontSize(12);
  pdf.text('Student Name: _________________________________', 40, 100);
  pdf.text('Date: _________________', 40, 120);
  pdf.text(`Total Questions: ${config.questionCount || 25}`, pageWidth - 80, 120);
  
  // Instructions
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'bold');
  pdf.text('Instructions:', 30, 160);
  
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(11);
  const instructions = [
    '1. Read each question carefully before answering.',
    '2. Show all your working in the space provided.',
    '3. Write your answers clearly in the answer boxes.',
    '4. For multiple choice questions, circle the correct answer.',
    '5. Check your answers when you have finished.',
    `6. Time allowed: ${config.timeAllowed || '60 minutes'}`
  ];
  
  let yPos = 175;
  instructions.forEach(instruction => {
    pdf.text(instruction, 35, yPos);
    yPos += 8;
  });
  
  // Good luck message
  pdf.setFontSize(12);
  pdf.setFont(undefined, 'italic');
  pdf.text('Good luck!', pageWidth / 2, pageHeight - 40, { align: 'center' });
  
  // Add decorative footer
  pdf.setFillColor(168, 85, 247); // purple-500
  pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
};

// Add questions pages to PDF
const addQuestionsPages = (pdf, questions) => {
  pdf.addPage();
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 25;
  const marginBottom = 30;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  let currentY = marginTop;
  let currentPage = 2;
  
  // Add page header
  const addPageHeader = (pageNum) => {
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Page ${pageNum}`, pageWidth / 2, 15, { align: 'center' });
    pdf.setDrawColor(200, 200, 200);
    pdf.line(marginLeft, 20, pageWidth - marginRight, 20);
  };
  
  addPageHeader(currentPage);
  
  questions.forEach((q, index) => {
    // Calculate space needed for this question
    const questionLines = pdf.splitTextToSize(
      `${q.number}. ${q.question}`,
      contentWidth - 10
    );
    
    let spaceNeeded = questionLines.length * 7; // Line height
    
    // Add space for multiple choice options
    if (q.inputType === 'multiple-choice' && q.options) {
      spaceNeeded += q.options.length * 8 + 5;
    } else {
      // Add space for answer box
      spaceNeeded += 25;
    }
    
    // Add space for work area
    spaceNeeded += 30;
    
    // Check if we need a new page
    if (currentY + spaceNeeded > pageHeight - marginBottom) {
      pdf.addPage();
      currentPage++;
      currentY = marginTop;
      addPageHeader(currentPage);
    }
    
    // Question number and text
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text(`${q.number}.`, marginLeft, currentY);
    
    pdf.setFont(undefined, 'normal');
    const questionText = pdf.splitTextToSize(q.question, contentWidth - 15);
    pdf.text(questionText, marginLeft + 10, currentY);
    currentY += questionText.length * 7 + 5;
    
    // Add answer area based on input type
    if (q.inputType === 'multiple-choice' && q.options) {
      // Multiple choice options
      pdf.setFontSize(10);
      q.options.forEach((option, optIndex) => {
        const optionLetter = String.fromCharCode(65 + optIndex); // A, B, C, D
        pdf.circle(marginLeft + 5, currentY - 2, 1.5);
        pdf.text(`${optionLetter}) ${option}`, marginLeft + 10, currentY);
        currentY += 8;
      });
    } else {
      // Answer box for written answers
      pdf.setDrawColor(150, 150, 150);
      pdf.rect(marginLeft + 10, currentY, 100, 15);
      
      pdf.setFontSize(9);
      pdf.setFont(undefined, 'italic');
      const answerLabel = q.unit ? `Answer (${q.unit}):` : 'Answer:';
      pdf.text(answerLabel, marginLeft + 10, currentY - 2);
      currentY += 20;
    }
    
    // Add work space
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'italic');
    pdf.text('Show your work:', marginLeft + 10, currentY);
    
    pdf.setDrawColor(220, 220, 220);
    pdf.setLineDash([2, 2]);
    for (let i = 0; i < 3; i++) {
      currentY += 8;
      pdf.line(marginLeft + 10, currentY, pageWidth - marginRight, currentY);
    }
    pdf.setLineDash([]);
    
    currentY += 15; // Space before next question
  });
};

// Add answer key page
const addAnswerKey = (pdf, questions) => {
  pdf.addPage();
  
  const pageWidth = pdf.internal.pageSize.getWidth();
  
  // Header
  pdf.setFillColor(255, 0, 0);
  pdf.rect(0, 0, pageWidth, 30, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont(undefined, 'bold');
  pdf.text('ANSWER KEY', pageWidth / 2, 20, { align: 'center' });
  
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'italic');
  pdf.text('For teacher use only', pageWidth / 2, 40, { align: 'center' });
  
  // Create answer table
  const tableData = questions.map(q => {
    let answer = q.answer;
    
    // Format answer based on type
    if (q.inputType === 'multiple-choice' && q.options) {
      const optionIndex = q.answer;
      answer = `${String.fromCharCode(65 + optionIndex)}) ${q.options[optionIndex]}`;
    } else if (q.unit) {
      answer = `${q.answer} ${q.unit}`;
    } else if (typeof answer === 'object') {
      answer = JSON.stringify(answer);
    }
    
    return [
      q.number.toString(),
      answer.toString(),
      q.category,
      q.skill
    ];
  });
  
  // Add table using jspdf-autotable
  pdf.autoTable({
    head: [['Q#', 'Answer', 'Category', 'Skill']],
    body: tableData,
    startY: 50,
    theme: 'grid',
    headStyles: {
      fillColor: [168, 85, 247], // purple-500
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      1: { cellWidth: 60 },
      2: { cellWidth: 40 },
      3: { cellWidth: 'auto' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Footer note
  const finalY = pdf.lastAutoTable.finalY || 250;
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'italic');
  pdf.text('Note: Ensure students show their working for full marks.', 20, finalY + 15);
};

// Main export function
export const generateExamPDF = (config = {}) => {
  const {
    examTitle = 'Mathematics Practice Exam',
    studentName = '',
    questionCount = 25,
    focusMode = 'all',
    includeAnswerKey = true,
    timeAllowed = '60 minutes'
  } = config;
  
  // Generate questions
  const questions = generateExamQuestions({
    focusMode,
    questionCount
  });
  
  // Initialize PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set default font
  pdf.setFont('helvetica');
  
  // Add cover page
  addCoverPage(pdf, {
    examTitle,
    studentName,
    questionCount,
    timeAllowed
  });
  
  // Add questions
  addQuestionsPages(pdf, questions);
  
  // Add answer key if requested
  if (includeAnswerKey) {
    addAnswerKey(pdf, questions);
  }
  
  // Save the PDF
  const fileName = `${examTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
  
  return {
    success: true,
    fileName,
    questionCount: questions.length
  };
};

// Export preview function (returns blob instead of downloading)
export const generateExamPreview = async (config = {}) => {
  const {
    examTitle = 'Mathematics Practice Exam',
    studentName = '',
    questionCount = 25,
    focusMode = 'all',
    includeAnswerKey = true,
    timeAllowed = '60 minutes'
  } = config;
  
  // Generate questions
  const questions = generateExamQuestions({
    focusMode,
    questionCount
  });
  
  // Initialize PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set default font
  pdf.setFont('helvetica');
  
  // Add cover page
  addCoverPage(pdf, {
    examTitle,
    studentName,
    questionCount,
    timeAllowed
  });
  
  // Add questions
  addQuestionsPages(pdf, questions);
  
  // Add answer key if requested
  if (includeAnswerKey) {
    addAnswerKey(pdf, questions);
  }
  
  // Return blob for preview
  return pdf.output('blob');
};