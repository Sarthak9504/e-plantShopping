import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItem: []
    },
    reducers: {
        addItem: (state, action) => {
            state.cartItem.push({ ...action.payload, quantity: 1 });
        },

        deleteItem: (state, action) => {
            state.cartItem = state.cartItem.filter(item => item.name !== action.payload.name);
        },

        incrementQuantity: (state, action) => {
            const item = state.cartItem.find(item => item.name === action.payload.name);
            if (item) item.quantity += 1;
        },

        decrementQuantity: (state, action) => {
            const item = state.cartItem.find(item => item.name === action.payload.name);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItem = state.cartItem.filter(cartItem => cartItem.name !== action.payload.name);
                }
            }
        }
    }
});

// Export actions for use in components
export const { addItem, deleteItem, incrementQuantity, decrementQuantity } = CartSlice.actions;

// Export reducer for store setup
export default CartSlice.reducer;
