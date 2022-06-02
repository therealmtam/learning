/* Surprise! You probably thought you could just forget
the line of code you just learned! Nope, not on my watch!

Try to write that 1-liner of React code again! This time,
see if you can figure out how to render an <ul> with 2+ <li>s inside*/

import React from "react" // needed for React versions below 17
import ReactDOM from "react-dom"

ReactDOM.render(
    <ul><li>Thing 1</li><li>Thing 3</li></ul>,
    document.getElementById("root")
)