import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    // cart: [],
    cart: [
        {
            pizzaId: 12,
            name: 'Mediterranean',
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
    ],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // payload === newItem
            state.cart.push(action.payload) //* we use push because here we can mutate the data
        },
        deleteItem(state, action) {
            // payload === pizzaId
            state.cart = state.cart.filter(
                (pizza) => pizza.pizzaId !== action.payload
            )
        },
        increaseItemQuantity(state, action) {
            // payload === pizzaId
            const pizza = state.cart.find(
                (pizza) => pizza.pizzaId === action.payload
            )
            if (!pizza) return null

            state.quantity = pizza.quantity++

            pizza.totalPrice = pizza.quantity * pizza.unitPrice
        },
        decreaseItemQuantity(state, action) {
            // payload === pizzaId
            const pizza = state.cart.find(
                (pizza) => pizza.pizzaId === action.payload
            )
            if (!pizza) return null

            pizza.quantity--

            pizza.totalPrice = pizza.quantity * pizza.unitPrice
        },
        clearCart(state) {
            state.cart = []
        },
    },
})

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions
export default cartSlice.reducer
