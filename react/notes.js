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
STATE MGMT
-----------------------
- Local component state (for reads/rerenders) + Context (for reads)
vs
- Local component state + Redux (for Global state mgmt and rendering)
  - Redux not only allows read access of global state values, but also triggers a re-render of components that consume the redux store data.
vs
- Local component state (for reads/rerenders) + React Query?

Local vs Global state:
- Local component state mgmt (read/rendering) is clean since the data that renders the state is very close to the actual uses of that data.
- However, what if you want to reduce the API calls to your BE to update that state for all use-cases across your application? For instance, you don't want to pull the same product information on the home page, product page, and cart page if you can help it and the data uses are the same.

However, in practice, BE apis are often not optimized (especially on legacy systems) to be more DRY with what APIs fetch which data. On legacy systems, several different APIs will probably fetch the same exact data multiple times from the same system, sometimes even on the same page.

The goal of GQL is to represent and reduce the redundant calls to your core microservices by providing a singular interface (the gql schema) and a singular resolver that resolves that data. This is the aim of moving to GQL because the singular interface and singular function execution for a specific piece of data is centralized. This then means that you can easily see all the use-cases based on FE queries that need data that originates from a particular system.

Then on the FE, if there is just a singular GQL interface for data, you can use React Query to more granularly and be more targeted on the data it needs to render a specific experience - which allows for granularity of FE state management at the component level without the need for a global Redux store level of access. It is a much cleaner way of maintaining state of a FE application this way.

But even with React Query, you don't reduce the need to query for the same exact data from the BE across FE use cases. You are just more clearly laying out for all to see what the originating use-case for all API calls are for a specific data service. For example, you won't reuse product information for the same item on the home page by cross checking it against items to fetch for the product page etc.

But say for a use case like an account management dashboard - in that event your data is fetched on a user by user basis and only a few users can update that data in the BE. In this case, a GQL interface to consolidate API use cases is probably much simpler because a lot of the data is not used by various different systems and interfaces - just ones accessible by the users that own that data. Also, for these FE applications, there probably isn't much global data use-cases aside from authentication and some base line user data. Therefore, a FE component level state management is probably more appropriate.

This is in contrast with ecommerce where several systems and use-cases both in the BE and FE can use the same data and thus you can potentially benefit from Global FE state data to reduce calls to the BE.

So in conclusion, - user data based applications vs ecommerce applications - local state management is best for user data based apps. Ecommerce can benefit from it too but there are more situations where global statemanagement is also needed or can be helpful.

So:
- a timer - use local state
- user data based applications (client-side rendered typically) - use local state for cleaner component writing but in terms of data pulling optimization (reduced calls to BE), you do want global state.

- ecommerce applications - local state if server side rendered pages, global state for client-side rendered.

-----------------------
INTERVIEW - REACT
-----------------------
- Strategy is to start with the outline and provide details
  - layout how state will be managed, the breakdown of html components which should inform you how to break down your React components
      - don't opt for reusability when componentizing - just state it in the interview that you can take a second pass and organize after getting a working implementation.
  - style components centrally
      - what about conditional/dynamic styling in React? How to do this elegantly?


- things remaining to learn:
  - css -
  - html elements (div, span, p, h1, section, main, nav)
  - how to build common items
  - how to center, space/layout


React -
- Functional components vs Class components
  - Functional components with useEffect and useState is the better and new way of doing things vs Class components of React.

-----------------------
SETUP PROXY in create-react-app
-----------------------
- https://create-react-app.dev/docs/proxying-api-requests-in-development/
- For local development, because the host is not the same host as you would have during a production deployment where the host is the url, you need a proxy to proxy to production servers.

- To do this, use React's setupProxy method of adding middleware during local development.

-----------------------
INTERVIEW - HTML
-----------------------
- box model

- Rules:
  - avoid setting heights to allow text to grow and shrink vertically

- CSS:
  - padding - inside the box (more background)
  - margin - outside the box (more empty space)
  - border-style:
  - border-width:
  - border-color:

- how to center something:

  - center an element on the page
  main {
      width: 600px; <= need the width to define the width of the element
      margin-left: auto;
      margin-right: auto;
  }

  - center text in an element (useful for a title element)
  main {
    text-align: center
  }

  - center everything in the body
  body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

- remove margin on body so elements touch the edges of the screen
  body {
    margin: 0
  }
*/
