import User from "./User";
import UserClass from "./UserClass";
import {Component} from "react";
import UserContext from "../utils/UserContext";

class About extends Component{

    constructor (props){
        super(props);
        //console.log("Parent constuctor");
    }

    componentDidMount() {
        //console.log("Parent ComponentDidMount");
    }

    componentWillUnmount(){
        //=>called when we're leaving the component
        //console.log(`8. Parent's will unmount.`);
    }//componentWillUnmount

    render(){

        //console.log("Parent Render");
        return (
            <div>
                <h1>About</h1>

                <div>
                    Logged in user
                    {/* => way to use context in class base components 
                   => .Consumer is the power given by the react to use it without hooks 
                        => UserContect.Consumer is used as the component && */}
                    <UserContext.Consumer>
                        {/* the call back function take the data as argument , who passes the data ?? 
                            the react take care of this */}
                       {/* {(data)=>console.log(data)} */ /*sample way*/}

                       {({loggedInUser}) => (
                            <h1 className="text-lg font-bold">{loggedInUser}</h1>
                        )}

                    </UserContext.Consumer>
                </div>

                <h2>This Namaste React </h2>
                {/* <User name={"Anuj Yadav (function props)"}/> */}

                {/* =>Declaring the props of user class */}
                <UserClass name={"First (class props)"}/>
                
            </div>
        )
    }
}


//=> constuction the same component in function method
const About2 = () =>{
    return (
        <div>
            <h1>About</h1>
            <h2>This Namaste React </h2>
            {/* <User name={"Anuj Yadav (function props)"}/> */}

            {/* declaring the userclass props */}
            <UserClass name={"Anuj Yadav (class props)"}/>  
        </div>
    )
}

export default About;




/*
---- Mounting Phase ----
1. Parent's constructor.
2. Parent's render.
3. First Child's constructors
4. First Child's render
	
	----- Component did mount is called after first render -----
5. First Child's did mount.
6. Parent's did mount.

---- Updating Phase is called after every render after first render ----
4. First Child's render
7. First Child's did update.

----- Component unwill mount phase -----
8. First Child's will unmount.
9. Parent's will unmount.
*/