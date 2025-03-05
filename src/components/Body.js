import RestaurantCard  from "./RestaurantCard";
import Shimmer from "./shimmer.js"
import {useState, useEffect, useContext} from "react";
import { SWIGGY_API, SWIGGY_UPDATE } from "../utils/constants.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";



const Body = () =>{


   

    // State Variable -  Super powerful Variable
    const [listOfRestaurants, setlistOfRestaurants] = useState([]);
    const [filteredRestaurants, setfilteredRestaurants] = useState([]);
    const[offset, setOffset] = useState(8); // Pagination offset (starting after the first 20)
    const[loading, setLoading] = useState(false); // to prevent duplicate api call
    const [hasMore, setHasMore] = useState(true); // Check if more data exists
    const Limit = 8; // number of restaurant fetch per request;

    
    
    const [searchText , setsearchText] = useState("");



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


    // logic for lazy laoding of restaurant updata api

    // logic for handling scroll
    
    
    useEffect( () =>{

      const handleScroll = () =>{
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const footer = document.querySelector("footer"); // Get the footer element
        const footerOffset = footer ? footer.offsetTop : 500; // Get the footer's position
        
  
        if(scrollTop + viewportHeight >= fullHeight-200 && !loading && hasMore ){
          fetchMoreData();
        }

        if(scrollTop + viewportHeight >= footerOffset && !loading && hasMore){
          setHasMore(false);
        }
        
      };

      window.addEventListener("scroll" , handleScroll);

      return () =>{
        window.removeEventListener("scroll" , handleScroll);
      };
     
    },[loading,hasMore]);

    const fetchMoreData = async () =>{

      setLoading(true);

      try{
        const moreData = await fetch(SWIGGY_API);

        const response = await moreData.json();

        const newRestaurant = response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants

        console.log(response);
        setfilteredRestaurants((prev) => [...prev,...newRestaurant]);
      }
      catch(error){
        console.error("Error fetching data" , error);
      }
      finally{
        setLoading(false);
      }
      
    };

    








    // lazy loading ends

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
                {/* <div className=" m-4 p-4 flex items-center">
                  <label>UserName :</label>
                  <input className="border border-black px-1 m-2" value = {loggedInUser} 
                    onChange={(e) => setUserName(e.target.value)  //changing the context data
                  }></input>
                </div> */}

            

            </div>
            
            {/* Displayint restaurant cards */}
            <div className="flex flex-wrap ml-[9rem] mr-24">
                {filteredRestaurants.map((restaurants,index) => (
                    <Link key= {index} to={"/restaurants/" + restaurants?.info?.id}>

                     <RestaurantCard  resData = {restaurants}/>
                      

                    </Link>
                    
                    ))}
                   


                
                

            </div>
        </div>
    );
};

export default Body;