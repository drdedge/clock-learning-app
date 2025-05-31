import React from 'react';

// Shared page wrapper component for consistent styling
const PageWrapper = ({ title, children }) => (
    <div className="flex flex-col items-center">
        <div className="relative w-full max-w-3xl mb-6">
            <h1 className="text-3xl font-bold text-center text-purple-700 my-4">{title}</h1>
            {/* Decorative elements */}
            <div className="absolute top-0 left-2 w-8 h-8 bg-pink-200 rounded-full opacity-50"></div>
            <div className="absolute top-6 right-4 w-6 h-6 bg-purple-200 rounded-full opacity-60"></div>
            <div className="absolute bottom-0 left-10 w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        </div>
        {children}
    </div>
);

export default PageWrapper;