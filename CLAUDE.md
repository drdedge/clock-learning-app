# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development
npm start          # Start dev server on localhost:3000
npm test           # Run tests in watch mode (Jest + React Testing Library)
npm run build      # Create production build

# Deployment
npm run deploy     # Deploy to GitHub Pages (https://drdedge.github.io/clock-learning-app)

# Installation Note
npm install --legacy-peer-deps  # Use if encountering peer dependency issues
```

## Architecture Overview

This is a React 19.0.0 educational app suite built with Create React App and Tailwind CSS. The app provides multiple educational games for children focused on math concepts. It uses a simple state-based navigation system (no React Router) with all pages configured centrally in `src/utils/pageConfig.js`.

### Current Apps

1. **Clock Learning**: Interactive clock learning with draggable hands
2. **Money Calculation**: Practice with coins and monetary values
3. **Cake Fractions**: Visual fraction learning with cake slices
4. **Number Line Fractions**: Understanding fractions on number lines
5. **7+ Math Practice**: Comprehensive math quiz with multiple categories

### Project Structure

```
src/
├── components/
│   ├── pages/              # Individual educational apps
│   │   ├── ClockLearningApp.js
│   │   ├── MoneyCalculationApp.js
│   │   ├── CakeFractionApp.js
│   │   ├── NumberLineFractionApp.js
│   │   └── SevenPlusQuizApp.js
│   └── shared/             # Reusable components
│       ├── PageWrapper.js
│       └── SmileyLogo.js
├── utils/
│   ├── pageConfig.js       # Central page configuration
│   └── questions/          # Question generators for math practice
│       ├── index.js        # Central exports for all generators
│       ├── README.md       # Developer guide for adding questions
│       └── [category].js   # Individual question category files
└── App.js                  # Main app with navigation logic
```

### Adding New Educational Apps

1. Create a new component in `src/components/pages/` following the pattern of existing apps
2. Add the page configuration to `src/utils/pageConfig.js`:
   ```javascript
   {
     id: 'unique-id',
     title: 'App Title',
     component: YourNewApp,
     bgColor: 'bg-pink-100' // Tailwind class for background
   }
   ```

### Component Structure

- **Pages** (`src/components/pages/`): Individual educational app components
- **Shared** (`src/components/shared/`): Reusable components like PageWrapper and SmileyLogo
- **Navigation**: Handled in `src/App.js` using the PAGES configuration
- **Questions** (`src/utils/questions/`): Modular question generators for the Math Practice app

### Math Practice Question System

The 7+ Math Practice app uses a modular question generation system:

- **Question Categories**: Word Problems, Money, Number Patterns, Place Value, Shapes, Measurement, Number Bonds, Mental Math, Fractions
- **Adding Questions**: Create generators in `src/utils/questions/[category].js` and export them
- **Focus Modes**: Automatically filters generators based on selected focus mode
- **Developer Guide**: See `src/utils/questions/README.md` for detailed instructions

### Key Configuration Files

- **`src/utils/pageConfig.js`**: Central configuration for all educational apps (navigation, titles, colors)
- **`src/utils/questions/index.js`**: Exports all question generators for the Math Practice app
- **`src/utils/questions/README.md`**: Comprehensive guide for adding new question types
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automatic deployment

### Styling Guidelines

The app uses a pink/purple girly theme with:
- Gradient backgrounds
- Rounded corners (`rounded-lg`, `rounded-xl`)
- Shadow effects for depth
- Child-friendly decorative elements (flowers, hearts, stars)
- Consistent use of pink-500, purple-500, and their variants
- Custom CSS animations for celebrations and interactions

When creating new components, maintain consistency with existing Tailwind classes and color scheme.

## Dependencies

Key dependencies:
- React 19.0.0
- Tailwind CSS (via cra-template-tailwindcss)
- lucide-react 0.460.0 (for icons)
- recharts 2.15.3 (for progress visualization)

## Testing

- **Framework**: Jest + React Testing Library (included with Create React App)
- **Current State**: No test files exist yet - tests can be added as `*.test.js` or `*.spec.js` files
- **Run Tests**: `npm test` (runs in watch mode)

## Deployment

The app automatically deploys to GitHub Pages when changes are pushed to the main branch via GitHub Actions. The workflow is configured in `.github/workflows/deploy.yml`.

**Production URL**: https://drdedge.github.io/clock-learning-app