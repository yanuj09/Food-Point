import { useState, useContext } from "react";
import {LOGO_URL} from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header= () =>{

    let btnName = "login";
    

    // useEffect(()=>{
    //     console.log("useEffect called")
    // },[]);

    //getting the online status data
    const onlineStatus  = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext);
    //console.log(loggedInUser);

    // selector fetching cart store data, giving acces to store
    // the function inside the useSelector hook tell us which part of the store to give the access
    const cartItems = useSelector((store) =>store.cart.item);
    //console.log(cartItems);

    return (
        <div  className="flex justify-between bg-pink-200 shadow-lg mb-2 h-32 ">
           <div className="logo-container mt-2">
           <img className="w-32 bg-transparent" src={LOGO_URL} />
           </div>

           <div className="flex items-center ">
                <ul className="flex p-14 m-4">
                    <li className="px-4">
                        Online Status: {onlineStatus? "✅":"🔴"}
                    </li>
                    <li  className="px-4">
                        <Link to= "/">Home</Link>
                    </li>
                    <li  className="px-4"> 
                        <Link to="/about">About Us</Link> 
                    </li>
                    <li className="px-4">
                        <Link to= "/contact"> Contact Us </Link> 
                    </li>
                    
                    <li className="px-4 font-bold"> 
                        <Link to= "/cart"> Cart ({cartItems.length}) </Link>
                    </li>
                

                    <li  className="px-4 font-bold">{loggedInUser}</li>
                </ul>
           </div>
        </div>
    )
};

export default Header;