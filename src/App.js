// App.js - Main application with navigation and girly theme
import React, { useState } from 'react';
import NumberLineFractionApp from './NumberLineFractionApp';
import CakeFractionApp from './CakeFractionApp';
import ClockLearningApp from './ClockLearningApp';

// Smiley face logo component
const SmileyLogo = () => (
  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-300 rounded-full flex items-center justify-center mr-3 shadow-md">
    <div className="relative w-8 h-5">
      {/* Eyes */}
      <div className="absolute w-1.5 h-1.5 bg-purple-800 rounded-full" style={{ top: '0', left: '1px' }}></div>
      <div className="absolute w-1.5 h-1.5 bg-purple-800 rounded-full" style={{ top: '0', right: '1px' }}></div>
      {/* Smile */}
      <div className="absolute w-6 h-3 border-b-2 border-purple-800 rounded-b-full" style={{ bottom: '0', left: '1px' }}></div>
    </div>
  </div>
);

function App() {
  const [currentApp, setCurrentApp] = useState('numberline'); // Default to number line fractions

  return (
    <div className="App font-comic bg-pink-50 min-h-screen">
      <nav className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <SmileyLogo />
            <h1 className="text-2xl font-bold">Kids Learning App</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              className={`px-4 py-2 rounded-full transition-all ${currentApp === 'numberline' ? 'bg-pink-700 shadow-inner' : 'hover:bg-pink-600'}`}
              onClick={() => setCurrentApp('numberline')}
            >
              Number Line Fractions
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all ${currentApp === 'cake' ? 'bg-pink-700 shadow-inner' : 'hover:bg-pink-600'}`}
              onClick={() => setCurrentApp('cake')}
            >
              Cake Fractions
            </button>
            <button
              className={`px-4 py-2 rounded-full transition-all ${currentApp === 'clock' ? 'bg-pink-700 shadow-inner' : 'hover:bg-pink-600'}`}
              onClick={() => setCurrentApp('clock')}
            >
              Clock
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {currentApp === 'numberline' && <NumberLineFractionApp />}
        {currentApp === 'cake' && <CakeFractionApp />}
        {currentApp === 'clock' && <ClockLearningApp />}
      </div>

      <footer className="text-center p-4 text-pink-700 text-sm">
        <p>Made with ❤️ for learning</p>
      </footer>
    </div>
  );
}

export default App;