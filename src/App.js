import React, {lazy, Suspense, useEffect, useState} from "react";
import reactDom from "react-dom/client"; 
import Header from "./components/Header";
import Body from "../src/components/Body";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom"; // use for routing 
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";  // to use appstore , it the component
import appStore from "./utils/appstore";
import Cart from "./components/Cart";
import Footer from "./components/Footer"; 





const AppLayout = () =>{

    const [UserName, setUserName] = useState();

    useEffect(()=>{
        // makeing the API call  and send username and password

        const data = {
            name: "Anuj",
        };
 
        setUserName(data.name);
    },[]);

    return (

        // providing the redux(store) using the Provider component
        <Provider store={appStore}>   
        {/* // here the context value will be "Default User" */}
        {/* // the setUserName is pass so that the UserName can be change from any where in the application */}
        <UserContext.Provider value={{loggedInUser: UserName, setUserName}}>
        {/* => here the context value is Anuj */}
        <div className="app">
           {/* => if here i pass the nested contextProvider then the Header context will nested context value */}
            <Header/>
            
            <Outlet/>
            <Footer/>            
        </div>
        </UserContext.Provider>
        </Provider>
    )
}

const appRouter = createBrowserRouter(
    [
        {
            path: '/',
            element: <AppLayout></AppLayout>,
            children: [ //children routing for dynamic purpose
                {
                    path: '/',
                    element: <Body></Body>,
                     
                },
                {
                    path: '/about',
                    element: <About></About>,
                },
                {
                    path: '/contact',
                    element: <ContactUs></ContactUs>,
                },
                {
                    path : "/restaurants/:resId",
                    element: <RestaurantMenu></RestaurantMenu>
                },
                {
                    path : "/cart",
                    element: <Cart/>
                }
            ],
            errorElement: <Error></Error>, // created own error page
        },
        
    ]
);



const root = reactDom.createRoot(document.querySelector("#root"));

root.render(<RouterProvider router={appRouter} />); // renderin using routerprovider component from react-router-DOM