// App.js - Main application with navigation and girly theme
import React, { useState } from 'react';
import { PAGES } from './utils/pageConfig';
import SmileyLogo from './components/shared/SmileyLogo';

function App() {
  const [currentPageId, setCurrentPageId] = useState(PAGES[0].id);

  const currentPage = PAGES.find(page => page.id === currentPageId);
  const CurrentComponent = currentPage?.component;

  return (
    <div className="App font-comic bg-pink-50 min-h-screen">
      <nav className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <SmileyLogo />
            <h1 className="text-2xl font-bold">Kids Learning App</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {PAGES.map(page => (
              <button
                key={page.id}
                className={`px-4 py-2 rounded-full transition-all ${currentPageId === page.id
                    ? 'bg-pink-700 shadow-inner'
                    : 'hover:bg-pink-600'
                  }`}
                onClick={() => setCurrentPageId(page.id)}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {CurrentComponent && <CurrentComponent />}
      </div>

      <footer className="text-center p-4 text-pink-700 text-sm">
        <p>Made with ❤️ for learning</p>
      </footer>
    </div>
  );
}

export default App;