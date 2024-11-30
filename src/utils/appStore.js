import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";


// Store(redux)
const appStore = configureStore({
    //==> this reducer store reducer which container smaller reducer form each slice 
    reducer: {
        cart: cartReducer,
    },
});

export default appStore;



/*
Vanilla (older) Redux => DON'T MUTATE STATE
const newState = [...state];  // creating the new state 
newState.items.push(action.payload); // update that newstate
return newState; // return the update newState, compolsory


// where in newer version that mutating the state compolsory
//returning no compolsory
// redux toolkits use IMMER library BTS
*/ 