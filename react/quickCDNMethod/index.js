//======================
// notice how CDN method of React development doesn't require the importation of React or ReactDOM or CSS loader or Style Loader (bundler related tools).
//======================

//======================
// example of a function the returns JSX
const page = () => (<h1>haro</h1>);

// example of a React component with Pascal name
function Page2 () {
  return (<h1 className="test">haro1</h1>);
}

//======================

// ReactDOM.render(page(), document.getElementById('root')); // works but "page" is not a react component, just a function that returns JSX.

// ReactDOM.render(<page />, document.getElementById('root')); // won't work because "page" is not a React component which requires the use of Pascal case in the name.

ReactDOM.render(<Page2 />, document.getElementById('root'));