import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CartItems from "./CartItems";



const Cart = ()=>{

    const clear = useDispatch();

    // clearing the cart items using the reducer function
    const handleClearCart = () =>{
        clear(clearCart());
    }

    const cartItems = useSelector((store) =>store.cart.item)

    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">Cart</h1>

            <div className="w-6/12 m-auto">

                <button className="bg-black rounded-lg text-white m-2 p-2"

                    onClick={handleClearCart}
                >
                    Clear Cart
                </button>

                {cartItems.length === 0 && <h5>Your Cart is Empty</h5>}

                {/* Displaying the added item card into the card reusing the itemlist components */}
                {/* <CartItems items= {cartItems}></CartItems>   */}
                <ItemList items = {cartItems}/>
            </div>

            
        </div>
    )
}

export default Cart;