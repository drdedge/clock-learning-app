# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

```bash
# Development
npm start          # Start dev server on localhost:3000
npm test           # Run tests in watch mode
npm run build      # Create production build

# Deployment
npm run deploy     # Deploy to GitHub Pages (https://drdedge.github.io/clock-learning-app)
```

## Architecture Overview

This is a React-based educational app suite built with Create React App and Tailwind CSS. The app provides multiple educational games for children focused on math concepts.

### Current Apps

1. **Clock Learning**: Interactive clock learning with draggable hands
2. **Money Calculation**: Practice with coins and monetary values
3. **Cake Fractions**: Visual fraction learning with cake slices
4. **Number Line Fractions**: Understanding fractions on number lines
5. **7+ Math Practice**: Comprehensive math quiz with multiple categories

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

- **Question Categories**: Word Problems, Money, Number Patterns, Place Value, Shapes, Measurement, Number Bonds, Mental Math
- **Adding Questions**: Create generators in `src/utils/questions/[category].js` and export them
- **Focus Modes**: Automatically filters generators based on selected focus mode
- **Developer Guide**: See `src/utils/questions/README.md` for detailed instructions

### Styling Guidelines

The app uses a pink/purple girly theme with:
- Gradient backgrounds
- Rounded corners (`rounded-lg`, `rounded-xl`)
- Shadow effects for depth
- Child-friendly decorative elements (flowers, hearts, stars)
- Consistent use of pink-500, purple-500, and their variants

When creating new components, maintain consistency with existing Tailwind classes and color scheme.

## Dependencies

Key dependencies:
- React 19.0.0
- Tailwind CSS (via cra-template-tailwindcss)
- lucide-react 0.460.0 (for icons)
- recharts 2.14.1 (for progress visualization)

## Deployment

The app automatically deploys to GitHub Pages when changes are pushed to the main branch via GitHub Actions. The workflow is configured in `.github/workflows/deploy.yml`.