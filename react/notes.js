/*
-----------------------
REACT and REACTDOM
-----------------------
- The "React" lib is needed because the JSX syntax is defined in the lib. Without the React lib, any JSX syntax will throw an error demanding the React library to be imported into the file.

- Rules:
  - JSX needs to be nested under a parent element.
    - ex. <div> as a parent or <></> (which is a React Fragment)

- If you console.log a React element, you get a JS object with properties that will provide metadata to React to determine what element to create and add to the real DOM.

- React is declarative (i.e., it abstracts the need for granular (imperative) instructions like grabbing an element, appending it, modifying its text - and instead provides a nice interface for developers to focus more on the high level needs of defining what the element looks like, where it goes, etc.)

- Ways of executing react components
  1) const componentA = () => (<h1>component 1</h1>) // function that returns JSX
  2) function ComponentB () { return (<h1>component 1</h1>) }; // traditional react component
    - to be classified as such you need to have Pascal case for the name, otherwise ReactDOM will not render it)

    ReactDOM.render(< ComponentB />, document.getElementById('root'))
      - to use "< ComponentB />" it needs to be a React Component with Pascal cased name because "< componentA />" will not work.

- CSS:
  - CSS accessible in the JS files -

- Images (static assets):
  - you need to let the bundler (webpack) know the location of your asset as it is bundling for it to pull the asset and create a proper location for the asset after bundling within your bundle. - So instead of this =>

    Component.js >
      export default function Component () {
        return (
          <div>
            <img
              src="../images/icon.png", <= the relative path in the folder structure during development
            />
          </div>
        )
      }

    Do this =>

    Component.js >
      import imagePath from "../images/icon.png" <= put the relative path as an import
      export default function Component () {
        return (
          <div>
            <img
              src={imagePath} <= this delegates the final absolute path of your asset to Webpack (the bundler) to figure out based on all its other inputs.
            />
          </div>
        )
      }

-----------
CDN way of installing and using React and ReactDOM
- include these script tags in the <head>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  - reference:
    - https://reactjs.org/docs/cdn-links.html

-----------
To use React and ReactDOM installed via npm (basically the local build way of packaging your react app), you need webpack which can use a preprocessor like Babel in the process of packaging your app.

https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9

- You will also need to
  1) install style-loader to create <style> tags
    - npm install --save-dev style-loader
    - https://www.npmjs.com/package/style-loader
    - So you can use this syntax in your React code:
      => import "./style.css";

  2) install css-loader. The css-loader interprets @import and url() like import/require() and will resolve them.
    - npm install --save-dev css-loader
    - https://www.npmjs.com/package/css-loader
    - So you can use this syntax in your React code:
      => import css from "file.css";

-----------------------
BABEL JSX PREPROCESSOR
-----------------------
CDN way of installing and using Babel (preprocessor for JSX syntax)
- include this script in the <head>

  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  - reference:
    - https://reactjs.org/docs/add-react-to-a-website.html#quickly-try-jsx

- you will also need to add a script tag in the <body> which tells the browser that index.js needs to be preprocessed by babel.

  <script src="index.js" type="text/babel"></script>
  - reference:
    - https://reactjs.org/docs/add-react-to-a-website.html#quickly-try-jsx
    - Now you can use JSX in any <script> tag by adding type="text/babel" attribute to it.


-----------------------

-----------------------


*/
