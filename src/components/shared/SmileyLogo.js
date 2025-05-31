import React from 'react';

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

export default SmileyLogo;