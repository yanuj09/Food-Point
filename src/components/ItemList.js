
import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants"; 
import { addItem } from "../utils/cartSlice";




//list of menu items
const ItemList = ({items})=>{
    // console.log(items);

    const dispatch = useDispatch();
    

    const handleAddItem = (item) =>{
        //Dispatch and action
        // is function will give the object with pizza in it , this will place at action.payload 
        // passing the item onclicking into the store
        dispatch(addItem(item));
    };

    return(
       <div>
            
            {items.map((item) =>{
                return(
                    // looping though id
                    <div key={item.card.info.id} className="p-2 m-2 border-b-2  flex justify-between"> 

                         {/* component body of menu items */}
                        <div className="w-9/12">

                            <div className="py-2">
                                <span className="font-bold">{item.card.info.name}</span>
                                <span className="font-mono">- ₹ {item.card.info.price/100 || 
                                                                item.card.info.defaultPrice/100}
                                </span>
                            </div>
                            <p className="font-extralight">{item.card.info.description}</p>

                        </div>

                        <div className="w-3/12 p-8">

                            <div className="absolute">
                                <button className=
                                                "p-2 rounded-lg bg-white text-lime-600 font-extrabold shadow-lg mt-28 w-32"
                                                onClick={()=>handleAddItem(item)} //on clicking the buttong the item of the button is passed to the function, that function dispactch that item into the store
                                                >

                                                    
                                                    ADD
                                </button>
                            </div>
                            <img src={CDN_URL + item.card.info.imageId} ></img>
                        </div>


                        

                       
    
                    </div>
                )
            })}
       </div>
    )
}


export default ItemList;



