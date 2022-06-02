/*
-----------------------
REACT and REACTDOM
-----------------------
CDN way of installing and using React and ReactDOM
- include these script tags in the <head>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  - reference:
    - https://reactjs.org/docs/cdn-links.html

To use React and ReactDOM installed via npm (basically the local build way of packaging your react app), you need webpack which can use a preprocessor like Babel in the process of packaging your app.

https://medium.com/age-of-awareness/setup-react-with-webpack-and-babel-5114a14a47e9

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
