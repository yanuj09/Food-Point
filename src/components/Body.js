import RestaurantCard  from "./RestaurantCard";
import Shimmer from "./shimmer.js"
import {useState, useEffect, useContext} from "react";
import { SWIGGY_API } from "../utils/constants.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";



const Body = () =>{


   

    // State Variable -  Super powerful Variable
    const [listOfRestaurants, setlistOfRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    
    
    const [searchText , setsearchText] = useState("");

   

    


    /*
    //same as above lline
    const arr = useState(resList);
    const [listOfRestaurants, setlistOfRestaurants] = arr;

    const listOfRestaurants = arr[0];
    const setlistOfRestaurants = arr[1];

    */


    // Rerender the card data after fetching the data
    useEffect(()=>{
      fetchData();
    } , []);

    // fetching the card data
    const fetchData = async () =>{
      const data = await fetch( SWIGGY_API);

      const json = await data.json();

      
      // console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setlistOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      setfilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      
      
    }

    // fetching the online status info
    const onlineStatus = useOnlineStatus(); 

    // setting the condition if the we offline then put the h1 on the screen
    if(onlineStatus === false){
      return (
              <h1>You are offline! Please check your internet connections.
              </h1>
              )
    };
     
    
    // setting the context variable throught the state variable define in the App.js 
    const {loggedInUser ,setUserName} = useContext(UserContext);

          // ternery operator
    return filteredRestaurants.length === 0? <Shimmer/> :(
        <div className="body">

            <div className="filter flex ml-[9rem] ">

            {/* search filter */}

            <div className="search m-4 p-4">

              <input 
                type="text" 
                className="border border-solid border-black px-1"
                value={searchText}
                onChange={
                  (e)=>{
                    setsearchText(e.target.value);
                }}
                >
                </input>

                <button className="px-4 py-1 m-4 bg-green-100 rounded-lg"
                  onClick={()=>{
                  //console.log(searchText);

                  const filteredRis = listOfRestaurants.filter(
                    (res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase())
                    );

                    setfilteredRestaurants(filteredRis);
                }}>
                  search
                </button>

               

            </div>

                {/* filter button */}

                <div className="search m-4 p-4 flex items-center ">
                    <button className="px-4 py-2 bg-gray-100 rounded-lg" 
                      onClick={()=>{
                        const filterlist = listOfRestaurants.filter((res)=> res.info.avgRating >4.3);

                        
                        setfilteredRestaurants(filterlist);
                      }}
                      >
                        Top Rated restaurants
                    </button>
                
                </div>


                {/* userName updating/overwritting the context data  */}
                <div className=" m-4 p-4 flex items-center">
                  <label>UserName :</label>
                  <input className="border border-black px-1 m-2" value = {loggedInUser} 
                    onChange={(e) => setUserName(e.target.value)  //changing the context data
                  }></input>
                </div>

            

            </div>
            
            {/* Displayint restaurant cards */}
            <div className="flex flex-wrap ml-[9rem] mr-24">
                {filteredRestaurants.map((restaurants) => (
                    <Link key= {restaurants?.info?.id  } to={"/restaurants/" + restaurants?.info?.id}>

                     <RestaurantCard  resData = {restaurants}/>
                      

                    </Link>
                    
                    ))}
                   


                
                

            </div>
        </div>
    );
};

export default Body;