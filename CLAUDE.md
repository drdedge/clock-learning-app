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

This is a React 19.0.0 educational app suite built with Create React App and Tailwind CSS. The app provides multiple educational games for children focused on 7+ UK mathematics. It uses a simple state-based navigation system (no React Router) with all pages configured centrally in `src/utils/pageConfig.js`.

### Current Apps

1. **Clock Learning**: Interactive clock learning with draggable hands
2. **Money Calculation**: Practice with coins and monetary values
3. **Cake Fractions**: Visual fraction learning with cake slices
4. **Number Line Fractions**: Understanding fractions on number lines
5. **7+ Math Practice**: Advanced quiz system with 15+ categories including:
   - Time & Clock Problems (15-minute increments)
   - 2D/3D Shape Properties (vertices, edges, faces)
   - Symbol Algebra & Equations
   - Graph Reading (bar, pie, line, pictograms)
   - Unit Conversions (length, mass, volume)
   - Real-World Comparisons

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
│   ├── shared/             # Reusable components
│   │   ├── PageWrapper.js
│   │   └── SmileyLogo.js
│   └── visuals/           # Interactive visual components
│       ├── InteractiveClock.js    # Draggable clock with touch support
│       ├── ShapeVisualizer.js     # 2D/3D shape rendering
│       └── FractionVisualizer.js  # Multiple fraction representations
├── utils/
│   ├── pageConfig.js       # Central page configuration
│   ├── supabase.js        # Supabase client and helpers
│   └── questions/         # Question generators for math practice
│       ├── index.js       # Dynamic question bank with no-repeat system
│       ├── clockTime.js   # Time & schedule problems
│       ├── shapes2D3D.js  # Shape properties & recognition
│       ├── symbolAlgebra.js # Symbol equations & patterns
│       ├── graphs.js      # Graph reading questions
│       ├── unitConversions.js # Measurement conversions
│       ├── everydayComparisons.js # Real-world estimations
│       └── [legacy].js    # Original question categories
├── hooks/
│   └── useSupabase.js     # Custom hooks for data management
└── App.js                 # Main app with navigation logic
```

### Visual Components

#### InteractiveClock
- Draggable hour and minute hands
- Touch and keyboard support
- 15-minute snap points
- Digital time display
- Visual feedback for answers

#### ShapeVisualizer
- 2D shapes (triangle to hexagon)
- 3D shape representations
- Interactive vertex/edge highlighting
- Property display panel
- Build mode for construction

#### FractionVisualizer
- Multiple visualization types (circle, bar, grid, number line)
- Interactive fraction selection
- Comparison mode
- Arithmetic operations
- Equivalent fractions display

### Math Practice Question System

The 7+ Math Practice app uses an advanced modular question generation system:

#### Categories
- **Classic**: Word Problems, Money, Number Patterns, Place Value, Shapes, Measurement, Number Bonds, Mental Math, Fractions
- **Advanced 7+**: Clock Time, 2D/3D Shapes, Symbol Algebra, Graphs, Unit Conversions, Real World Comparisons

#### Key Features
- **Dynamic Question Bank**: No-repeat system tracks used questions
- **15 Focus Modes**: Including '7+ Challenge' and subject-specific practice
- **Visual Integration**: Questions can display clocks, shapes, and fractions
- **Multiple Input Types**: Number, text, and multiple-choice
- **Adaptive Tips**: Context-aware hints for wrong answers

### Supabase Integration

The app uses Supabase for cloud storage and real-time features:

#### Configuration
- **Client**: `src/utils/supabase.js`
- **Hooks**: `src/hooks/useSupabase.js`
- **Environment**: `.env.local` (required for API keys)

#### Database Tables
- `student_progress`: Track scores and performance
- `visual_configs`: Store component settings
- `question_templates`: Manage question parameters

#### Features
- Student progress tracking
- Real-time updates
- Leaderboards
- Session management
- Offline fallbacks

### Key Configuration Files

- **`src/utils/pageConfig.js`**: Central configuration for all educational apps
- **`src/utils/questions/index.js`**: Dynamic question bank system with generators
- **`.env.local`**: Supabase credentials (not committed to git)
- **`.github/workflows/deploy.yml`**: GitHub Actions workflow for automatic deployment

### Styling Guidelines

The app uses a pink/purple girly theme with:
- Gradient backgrounds
- Rounded corners (`rounded-lg`, `rounded-xl`)
- Shadow effects for depth
- Child-friendly decorative elements (flowers, hearts, stars)
- Consistent use of pink-500, purple-500, and their variants
- Custom CSS animations for celebrations and interactions
- Responsive design for tablets and mobile

### Dependencies

Key dependencies:
- React 19.0.0
- Tailwind CSS (via cra-template-tailwindcss)
- lucide-react 0.460.0 (for icons)
- recharts 2.15.3 (for progress visualization)
- @supabase/supabase-js 2.54.0 (for backend)

### Testing

- **Framework**: Jest + React Testing Library (included with Create React App)
- **Current State**: No test files exist yet - tests can be added as `*.test.js` or `*.spec.js` files
- **Run Tests**: `npm test` (runs in watch mode)

### Deployment

The app automatically deploys to GitHub Pages when changes are pushed to the main branch via GitHub Actions.

**GitHub Actions Workflow**: `.github/workflows/deploy.yml`
- Triggers on push to main branch
- Uses Node.js 18
- Installs dependencies with `--legacy-peer-deps`
- Builds and deploys to gh-pages branch

**Production URL**: https://drdedge.github.io/clock-learning-app

### Environment Variables

Required for full functionality:
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Note: The app will work without these but database features will be disabled.