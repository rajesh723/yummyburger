import { createReducer } from "@reduxjs/toolkit";

const initialState ={
   cartItems :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) :
   {
    cheeseBurger: {
      quantity : 0,
      price : 200
    },

    grilledChickenBurger:{
      quantity : 0,
      price : 500
    },

    jumboBurger :{
      quantity : 0,
      price : 900
    }
   },
   subTotal : localStorage.getItem("cartPrices") ? JSON.parse(localStorage.getItem("cartPrices")).subTotal : 0,
   tax : localStorage.getItem("cartPrices") ? JSON.parse(localStorage.getItem("cartPrices")).tax : 0,
   shippingCharges:localStorage.getItem("cartPrices") ? JSON.parse(localStorage.getItem("cartPrices")).shippingCharges :  0,
   total: localStorage.getItem("cartPrices") ? JSON.parse(localStorage.getItem("cartPrices")).total : 0,
   shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
}


export const cartReducer = createReducer(initialState,{
    cheeseBurgerIncrement : (state) => {
        state.cartItems.cheeseBurger.quantity+=1;
    },

    grilledChickenBurgerIncrement : (state) => {
        state.cartItems.grilledChickenBurger.quantity+=1;
    },

    jumboBurgerIncrement : (state) => {
        state.cartItems.jumboBurger.quantity+=1;
    },
      
    cheeseBurgerDecrement : (state) => {
        state.cartItems.cheeseBurger.quantity-=1;
    },

    grilledChickenBurgerDecrement : (state) => {
        state.cartItems.grilledChickenBurger.quantity-=1;
    },

    jumboBurgerDecrement : (state) => {
        state.cartItems.jumboBurger.quantity-=1;
    },
      

    calculatePrice : (state) =>{
        state.subTotal = state.cartItems.cheeseBurger.quantity*state.cartItems.cheeseBurger.price + state.cartItems.grilledChickenBurger.quantity*state.cartItems.grilledChickenBurger.price + state.cartItems.jumboBurger.quantity*state.cartItems.jumboBurger.price;
        state.tax = state.subTotal*0.18;
        state.shippingCharges = (state.subTotal> 1000 || state.subTotal === 0)? 0 : 100;
        state.total =  state.subTotal !== 0 ? state.subTotal + state.tax + state.shippingCharges : 0;
    },

    emptyState :(state) =>{
        state.cartItems = {
            cheeseBurger: {
                quantity : 0,
                price: 200
            },

            grilledChickenBurger:{
                quantity : 0,
                price : 500
            },

            jumboBurger :{
                quantity : 0,
                price : 900
            }
        };

        state.subTotal = 0;
        state.tax = 0;
        state.shippingCharges = 0;
        state.total = 0;
    },

    addShippingInfo : (state,action) =>{
        state.shippingInfo ={
            hNo:action.payload.hNo,
            city:action.payload.city,
            state:action.payload.city,
            country:action.payload.country,
            pinCode:action.payload.pinCode,
            phoneNo:action.payload.phoneNo
        }
    }
});




