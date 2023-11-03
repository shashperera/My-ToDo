# Getting Started with My-ToDo App

## Overiview of Files

**1. Index.js** - Entry point of the React app, where we typically render the main component(App.js) into DOM. \
**2. App.js** - Root component of the application, serves as container for other components, defines overall structure of UI. \
**3. Index.html** - HTML template for your application, defines the structure of the web page. \
**4. package.json** - define the project's dependencies, scripts, and other metadata, useful for running scripts using npm. \
**5. Virtual DOM** - When we create a React component, React builds a Virtual representaion(lightweight JS object) of the real DOM, When the component's state or props change it compares the differences. \ 
React then updates only the parts of the actual DOM that have changed, resulting in a more efficient update process, using the minimum number of DOM manipulations (performance optimization).


## How to run

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

