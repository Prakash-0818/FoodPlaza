import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carts: []
}
   
const cartSlice = createSlice({
    name: "cartslice",
    initialState,
    reducers:{
            //add to cart
            addToCart:(state, action)=>{
                const itemIndex = state.carts.findIndex((item)=>item.id ===action.payload.id);
                if(itemIndex>=0){
                    state.carts[itemIndex].qnty +=1;
                }else {
                    const temp = {...action.payload,qnty:1}
                    state.carts = [...state.carts, temp]
                }
            },

            //remove particular item from cart
            removeFromCart:(state, action)=> {
                const data= state.carts.filter((ele)=>ele.id !== action.payload);
                state.carts = data;

            },

            //remove single items (decrement)
            removeSingleItems:(state, action)=> {
                const itemIndex_dec = state.carts.findIndex((item)=>item.id ===action.payload.id);
                if(state.carts[itemIndex_dec].qnty >=1) {
                    state.carts[itemIndex_dec].qnty -=1;
                }
            },

            //empty cart

            emptyCart:(state, action) =>{
              state.carts=[];
            }

    } 
})

export const {addToCart, removeFromCart, removeSingleItems, emptyCart}=cartSlice.actions;

export default cartSlice.reducer;