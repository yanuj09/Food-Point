import ItemList from "./ItemList";
import { useState } from "react";


// It is the controlled component . It is controlled by RestaurantMenu.js
const RestaurantCategory = ({data, showItem , setShowIndex})=>{

    //[showItem, setShowItem] = useState(false); // the accordian is closed or opened

    // function to make the occordian toggle 
    // sending the index of the clicked category to the parents components
    const handleClick = ()=>{
        setShowIndex();
    };

    //console.log(data);

    
    return(
        <div >
        {/* Header */} 
            <div className="w-full mx-auto my-4 bg-gray-50  shadow-lg p-4" >

                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">{data.title} ({data.itemCards.length})</span>
                    <span>🔽 </span>
                </div>
                
                {/* the ItemList component is controlled by showItem state variable */}
                {showItem && <ItemList items = {data.itemCards}/>}
            </div>

           
        
        {/* body */}
        </div>
    );
};


export default RestaurantCategory;




/*

// Here the category was controlled by itself(categories). Hence it was not controlled by its parents (restaurnatMenu.js)
// Hence it is the uncontrolled component.

const RestaurantCategory = ({data})=>{

    const[showItem, setShowItem] = useState(false); // the accordian is closed or opened

    // function to make the occordian toggle (changes in showItem variable)
    const handleClick = ()=>{
        showItem === false? setShowItem(true): setShowItem(false);
        // setShowItem(!showItem)
    };

    //console.log(data);

    
    return(
        <div >
        {/* Header 
            <div className="w-full mx-auto my-4 bg-gray-50  shadow-lg p-4" >

                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">{data.title} ({data.itemCards.length})</span>
                    <span>🔽 </span>
                </div>
                
                {/* the ItemList component is controlled by showItem state variable 
                {showItem && <ItemList items = {data.itemCards}/>}
            </div>

           
        
        {/* body 
        </div>
    );
};

*/