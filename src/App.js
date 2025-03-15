// App.js - Main application with navigation
import React, { useState } from 'react';
import FractionLearningApp from './FractionLearningApp';
import ClockLearningApp from './ClockLearningApp';

function App() {
  const [currentApp, setCurrentApp] = useState('fractions'); // Default to fractions app
  
  return (
    <div className="App">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Learning Games for Kids</h1>
          <div className="space-x-4">
            <button 
              className={`px-4 py-2 rounded ${currentApp === 'fractions' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
              onClick={() => setCurrentApp('fractions')}
            >
              Fractions
            </button>
            <button 
              className={`px-4 py-2 rounded ${currentApp === 'clock' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
              onClick={() => setCurrentApp('clock')}
            >
              Clock
            </button>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto p-4">
        {currentApp === 'fractions' ? <FractionLearningApp /> : <ClockLearningApp />}
      </div>
    </div>
  );
}

export default App;