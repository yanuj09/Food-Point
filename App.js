import React from "react";
import reactDom from "react-dom/client";


// <div id="parent">
//     <div id ="child">
//         <h1>I am an h1 tag</h1>
//         <h1>I am an h1 tag</h1> 
//     <div id ="child">
//         <h1>I am an h1 tag</h1>
//         <h1>I am an h1 tag</h1> 
//     </div>
// </div>
//  ReactElement(objec) => HTML(browser Understands)

/*
const parent = React.createElement("div" , {id: "parent"}, 
    [React.createElement("div" , {id: "child"},
        [React.createElement("h1" , {} , "I am an h1 tag"), 
        React.createElement("h2" , {} , "I am an h2 tag")]),
    React.createElement("div" , {id: "child2"},
            [React.createElement("h1" , {} , "I am an h1 tag"), 
            React.createElement("h2" , {} , "I am an h2 tag")])
    ]);

*/


/*
// created using core react
const heading = React.createElement("h1" , {id: "heading"} , "Hello World from React!");  

// same thing create using JSX
const jsxHeading = <h1 className="heading" tabIndex={1}>Namaste react using JSX!</h1>;

*/

// console.log(heading); // object 

// console.log(jsxHeading);
// console.log(parent);

const elem = <span>React Element</span>;
// React function component
const jsxHeading2 = (
       
        <h1 className="heading" >
             {elem}
            Namaste react using JSX!</h1>
    );


const Title = function() {
    return (
  
        <h1 className="head" tabIndex={1}>React  Function component1</h1>
   
    );
};


const number = 10000;

const HeadingComponent = () =>{
    return (
        
    <div id="container">
        {jsxHeading2}
        <Title/>
        <Title></Title>
        {Title()}
        <h1 className="heading">React  Function component</h1>;
    </div>
    );
};

// const HeadingComponent2 = () => (<h1  className="heading">React  Function component</h1>);


const root = reactDom.createRoot(document.querySelector("#root"));

// root.render(heading);
// root.render(jsxHeading);
// root.render(parent);

// rendering react component
root.render(<HeadingComponent/>);