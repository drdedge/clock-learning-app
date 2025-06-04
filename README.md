This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Overview

The project is a suite of educational mini-apps built with React and Tailwind CSS. It currently includes Clock Learning, Money Calculation, Cake Fractions, Number Line Fractions, and a 7+ Math Practice quiz.

### General Structure
- Navigation is configured in `src/utils/pageConfig.js` which maps page IDs to their React components.
- `src/App.js` renders navigation buttons and loads the selected component.
- Each mini-app lives under `src/components/pages/` while shared elements are in `src/components/shared/`.

### Question System
- The Math Practice quiz uses modular generators located in `src/utils/questions`.
- `index.js` imports all categories and filters generators for focus modes.
- The directory contains word problems, money problems, patterns, place value, shapes, measurement, number bonds, and mental math.
- See `src/utils/questions/README.md` for instructions on creating new generators.

### Styling and Theme
- Styling relies on Tailwind with a pink/purple palette as described in `CLAUDE.md`.
- A custom "Comic Neue" font is loaded in `src/index.css` via the `font-comic` class.

### Running and Deploying
- Use `npm start`, `npm test`, and `npm run build` during development.
- Deployments occur with `npm run deploy` through a GitHub Actions workflow.

### Pointers for New Contributors
1. Add a new mini-app under `src/components/pages/` and register it in `src/utils/pageConfig.js`.
2. Extend the quiz system by adding generators per `src/utils/questions/README.md`.
3. Follow the styling guidelines and reuse `PageWrapper` for layout.
4. Check `.github/workflows/deploy.yml` to understand deployment.
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
