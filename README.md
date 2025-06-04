# Kids Learning App

A collection of small learning games built with **React** and **Tailwind CSS**. The app helps children practice concepts like telling time, counting money and working with fractions.

## Project Overview
- **Clock Learning** – move the hands of an analog clock to match a target time
- **Money Calculation** – add up coins to purchase items
- **Cake Fractions** – visualise fractions with cake slices
- **Number Line Fractions** – identify fractions on a number line
- **7+ Math Practice** – modular quiz with many question categories

Navigation between these activities is configured in `src/utils/pageConfig.js` and rendered by `src/App.js`.

## Directory Structure
```
clock-learning-app/
├── public/                # Static assets and HTML template
├── src/
│   ├── components/
│   │   ├── pages/         # Each mini‑app component
│   │   └── shared/        # Reusable UI elements
│   ├── utils/
│   │   ├── pageConfig.js  # Page definitions
│   │   └── questions/     # Generators for Math Practice
│   ├── App.js
│   └── index.js
├── package.json
├── tailwind.config.js
└── .github/workflows/     # GitHub Pages deployment
```

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   The app runs at [http://localhost:3000](http://localhost:3000).
3. Create a production build:
   ```bash
   npm run build
   ```
4. Deploy to GitHub Pages (requires push access):
   ```bash
   npm run deploy
   ```

