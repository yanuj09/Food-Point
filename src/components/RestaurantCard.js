import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";
import {useContext} from "react";


const RestaurantCard = (props)=>{
    const {resData} = props;
    
    
    const {loggedInUser} = useContext(UserContext);

    const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } = resData.info;

    return(
        <div className="m-4 p-4 w-[275px] rounded-lg bg-gray-50 hover:bg-gray-200" >
            {/* style={{backgroundColor:" #f0f0f0"}} => one of the way of add inline css */}
            <img className="rounded-lg" src={CDN_URL+ 
                                            cloudinaryImageId}
                                            ></img>
             {/* {props.resname} */} 
            <h3 className="font-bold py-1">{name}</h3>
            {/* {props.Cusine} */}
            <h4 className="font-serif">{cuisines.join(", ")}</h4>   
            <h4 className="font-mono">{avgRating} stars</h4> 
            <h4>{costForTwo} </h4>
            <h4>{sla?.deliveryTime} minutes </h4>
            <h4>User : {loggedInUser}</h4>
        </div>
    )
};


// Higherorder components

// input - RestaurantsCard ==>> RestaurantCardPromoted

export const withOpenLabel = (RestaurantCard)=>{
   
    return (props)=>{
        return(
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Open</label>
                <RestaurantCard {...props}/>
            </div>
        );
    };
};

export default RestaurantCard;
