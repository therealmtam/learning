/* Surprise! You probably thought you could just forget
the line of code you just learned! Nope, not on my watch!

Try to write that 1-liner of React code again! This time,
see if you can figure out how to render an <ul> with 2+ <li>s inside*/

import React from "react" // needed for React versions below 17
import ReactDOM from "react-dom"
import "./index.css" // needed for use of the style sheets applicable to the React code in this scope. This is necessary for bundler way of writing React

function Component() {
  return (<ul>
      <li>Thing 1</li>
      <li>Thing 3</li>
      <p className="test">test</p>
    </ul>)
}

ReactDOM.render(
    <Component/>,
    document.getElementById("root")
)