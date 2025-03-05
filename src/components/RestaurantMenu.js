import {useEffect,useState} from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ItemList from "./ItemList";

const RestaurantMenu = ()=>{
   
    //const [resinfo, setresinfo] = useState(null); // updating user menu data
    const {resId} = useParams(); // fetching the restaurant id

    const resinfo = useRestaurantMenu(resId); // getting the res Menu from the useRestaurant hook

    const [showIndex, setShowIndex] = useState(0);  // variable to shore the index of the clicked occordian (basically used to which category is needed to show their body)
    
    const [searchDishes, setSearchDishes] = useState(""); // search input value
    const [filterResult, setFilterResult] = useState(""); // filtered dishes
    console.log(filterResult);
    //console.log(searchDishes);
    
    

    // conditional rendering 
    if(resinfo === null ) return <Shimmer/>;

  
   // destructuring
    const{cuisines, name, costForTwoMessage,locality,avgRating,totalRatingsString} = resinfo?.cards[2]?.card?.card?.info ;
    const{deliveryTime} = resinfo?.cards[2]?.card?.card?.info?.sla ;

    const {itemCards} = resinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || {}; // {} this for safe destructing
    
    // console.log(itemCards);
    //console.log(resinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = 
        resinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c)=>
            c?.card?.card?.["@type"]
            ==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

    //console.log(categories);

    const allDishes = categories.flatMap((categories)=> categories.card.card.itemCards);
    //console.log(allDishes);
   
   
    // if(resinfo === null) return <Shimmer/> ;
    // building the menu page
    return(
        <div className="menu mx-80 ">
            <section className="res-headers flex justify-between ">
                <div>
                    <h1 className="font-semibold text-5xl pt-4 pb-2">{name}</h1>
                    <p className="text-lg font-mono">{cuisines.join(", ")} </p>
                    <p className="text-lg font-extralight">{locality}</p>
                </div>
                <hr/>

                <div className="res-rating pt-4">
                    <h2>⭐{avgRating}</h2>
                    <hr/>
                    <h4>💵{totalRatingsString}</h4>
                </div>
             
            </section>
            <hr/>

            <section className="res-deliveryInfo flex py-3 font-semibold">
                <h3>🕗{deliveryTime} mintues</h3>
                <p className="ml-3">⦿{costForTwoMessage}</p>
            </section>
            <hr/>

            <section>
                <h4 className="text-center py-4 tracking-wider font-medium text-slate-500">MENU</h4>
            </section>
            <hr/>

            <section>
                {/* search option for the dishes */}
                <input placeholder="Search for Dishes" 
                className="my-4 border border-solid border-black px-2"
                value ={searchDishes}
                onChange={(e) =>{
                    setSearchDishes(e.target.value);
                    
                }}
                >
                </input>
                <button className="bg-green-100 p-1 ml-1 rounded-md"
                onClick={() =>{
                    const filterDish = allDishes.filter((dish)=>{

                        return (
                            dish?.card?.info?.name.toLowerCase().includes(searchDishes.toLowerCase()) ||
                             dish?.card?.info?.category.toLowerCase().includes(searchDishes.toLowerCase()) ||
                             dish?.card?.info?.description.toLowerCase().includes(searchDishes.toLowerCase())
                        )
                    }
                        
                            
                    )
                    //console.log(filterDish);
                    setFilterResult(filterDish);
                    

                    
                    
                }}

                >Search</button>

                
                
                <button className="ml-5 border border-solid rounded-xl px-2 "
                    onClick={() =>{
                        const vegMenu = allDishes.filter((dish)=> dish.card.info?.itemAttribute?.vegClassifier === "VEG")
                        console.log(vegMenu);
                    }}
                >veg</button>
                <button className="ml-5 border border-solid rounded-xl px-2"
                    onClick={() =>{
                        const vegMenu = allDishes.filter((dish)=> dish.card.info?.itemAttribute?.vegClassifier === "NONVEG")
                        console.log(vegMenu);
                    }}
                >non-veg</button>
                <button className="ml-5 border border-solid rounded-xl px-2"
                onClick={
                    ()=>{
                        const bestSeller = allDishes.filter( (dish) =>{
                            return (
                                dish?.card?.info?.isBestseller === true
                            )
                        })
                        //console.log(bestSeller);
                        setFilterResult(bestSeller);
                    }
                }
                
                >Bestseller</button>
            </section>
            <hr/>

            {/* Categoris accordian */}

            {
                searchDishes.length > 0  && filterResult != 0 ? (


                        <ItemList items = {filterResult}/>
                    
                    
                    
                
                ):
                (
                    categories.map((category, index)=>
                        (
                            //controlling componeent
                            <RestaurantCategory 
                                key={category?.card?.card?.title} 
                                data= {category?.card?.card}
                                showItem= {index== showIndex && true}  // the index which is true is to be show their occordian body
                                
                                setShowIndex={()=>setShowIndex(index)} //get the index of the category which is clicked to show
                            />
                        )
                    )
                )
            }

            
            {/* {categories.map((category, index)=>
                (
                    //controlling componeent
                    <RestaurantCategory 
                        key={category?.card?.card?.title} 
                        data= {category?.card?.card}
                        showItem= {index== showIndex && true}  // the index which is true is to be show their occordian body
                        
                        setShowIndex={()=>setShowIndex(index)} //get the index of the category which is clicked to show
                    />
                )
            )} */}
            
            
            
           
            
       
        </div>
    );
};

export default RestaurantMenu;