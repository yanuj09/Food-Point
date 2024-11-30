import { useEffect, useState } from "react";
import { SWIGGY_RES_MENU } from "./constants";


// creating the custom hook
const useRestaurantMenu = (resId)=>{
    const [resInfo, setResInfo] = useState(null);

    useEffect(()=>{
        
        fetchData( );
    },[]);

    // fetching the data from the api    
    const fetchData = async ()=>{
        const data = await fetch(SWIGGY_RES_MENU +resId );
        // console.log(data);
        const json = await data.json();

        setResInfo(json.data);
        // console.log(json);
    }

    return resInfo;
};

export default useRestaurantMenu;

