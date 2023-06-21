import {configureStore} from '@reduxjs/toolkit'; 
import { authReducer } from './reducers/userReducer';
import { cartReducer} from './reducers/cartReducer';
import {adminReducer} from './reducers/adminReducer'
import { orderReducer, ordersReducer } from './reducers/orderReducer';

const store = configureStore({
    reducer: {
        auth : authReducer,
        cart : cartReducer,
        order: orderReducer,
        orders: ordersReducer,
        admin: adminReducer
    },
});

export default store;

export const server =  "https://yummyburger.onrender.com/api/v1";