import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  groupedProducts: [],
  isModalOpen: false
}

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setGroupedProducts: (state, { payload }) => {
      if (payload.quantity <= 0) return
      state.groupedProducts.push(payload);
    },
    triggerModal: (state, {payload}) => {
      state.isModalOpen = payload;
    }
  }
})

// Actions
export const { setGroupedProducts, triggerModal } = shoppingCartSlice.actions

// Selectors
export const selectedGroupedProducts = state => state.shoppingCart.groupedProducts
export const isModalOpen = state => state.shoppingCart.isModalOpen

// Reducer export
export default shoppingCartSlice.reducer
