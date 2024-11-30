import React from "react";

class UserClass extends React.Component{

    // way of receiving props
    // constructing the instance of class component
    constructor(props){
        super(props); //super (props) is used to call constructor of the parents calls and ensure this.props is correctly setup
        
        // 
        this.state = {

            userInfo: {
                name : "Dummy",
                Location: "Default",
            },
        };
        //console.log(this.props.name +"Child Contructor");
    }

    // fetching the data
    async componentDidMount(){
        //console.log(this.props.name+ "Child ComponentDidMount");

        const data = await fetch("  https://api.github.com/users/yanuj09");

        const json = await data.json();

        this.setState({
            userInfo : json,
        }
            
        );

        //console.log(json);
    }

    // call for rerendering
    componentDidUpdate(){
        //console.log("Child component updated");
    }

    // Going from one page to another page
    componentWillUnmount(){
        //console.log("Child component Unmounted");
    }



    render(){

        //console.log(this.props.name +"Child Render");

       const{name ,location,avatar_url} = this.state.userInfo;
       
        

        return(
            <div className="user-card">
                
                <img  className="w-40" src={avatar_url}></img>
                 <h1>Name: {name}</h1>    {/*to acces the props we use 'this' keyword */}
                <h2>Location: {location}</h2>
                <h3>Contact : anujyadav.itengineer@gmail.com</h3>
            </div>
           
        );
    }
};

export default UserClass;



/*
This is an issue
-----------------
About's constructor.
About's render.
About's did mount.
Namaste React - prints 13+
About's will unmount. 

---- navigated to other component, still the set interval is running and another interval is created -----
Namaste React  - prints 20+

to fix this issue clean up is important, componentWillUnmount
*/