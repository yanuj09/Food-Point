import { createSlice } from "@reduxjs/toolkit";

// creating the slice of the store using createSlice function
// consist of name of the slice , it initialState and the reducer function
// the reducures as many function as much we want to perform on slice 
const cartSlice = createSlice({
    name:" cart",
    initialState: {
        item : [],
    },
 
    // ==> reducerssss  becoz it contain many  reducer
    reducers: {
        addItem: (state, action) =>{
            // mutating our slice here
            state.item.push(action.payload);
        },
        removeItem : (state) =>{
            state.item.pop();
        },
        // originalState = {items: ["pizza"]};
        clearCart: (state) =>{
            // state = ["anuj"]; // here not mutating the state it is just refering the state
            // console.log(current(state)); // this is way to read the state into the reducer
            state.item.length = 0;
            // return {items:[]} ; // this new return object will replace the existing(original) object/
        },
    
    },
}
);

// ==> export the action and reducer  sepeartly

export const{addItem, removeItem, clearCart} = cartSlice.actions;

// ==> reducer becoz it is combine smaller reducers to single reducer
export default cartSlice.reducer;