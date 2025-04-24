import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './pages/CartSlice';
import authReducer from './pages/authSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
});

export default store;
