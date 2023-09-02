import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  groupedProducts: [],
  shoppingCartModalIsOpened: false,
  completedPurchaseModalIsOpened: false
}


const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('shoppingCart');
    if (serializedState === null) return initialState;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Error loading state from localStorage:', e);
    return initialState;
  }
};

const preloadedState = loadStateFromLocalStorage();

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: preloadedState,
  reducers: {
    setGroupedProducts: (state, { payload }) => {
      if (payload.quantity <= 0) return
      state.groupedProducts.push(payload);
    },
    emptyCart: (state, { payload }) => {
      state.groupedProducts = []
    },
    removeOrDecreaseProduct: (state, { payload }) => {
      const productIndex = state.groupedProducts.findIndex(product => product.id === payload.id);
      if (productIndex === -1) return;

      if (state.groupedProducts[productIndex].quantity > 1) {
        state.groupedProducts[productIndex].quantity -= 1;
      } else {
        state.groupedProducts.splice(productIndex, 1);
      }
    },
    triggerShoppingCartModal: (state, { payload }) => {
      state.shoppingCartModalIsOpened = payload;
    },
    triggerCompletedPurchaseModal: (state, { payload }) => {
      state.completedPurchaseModalIsOpened = payload;
    }
  }
})

// Actions
export const { setGroupedProducts, triggerShoppingCartModal, triggerCompletedPurchaseModal, removeOrDecreaseProduct, emptyCart } = shoppingCartSlice.actions

// Selectors
export const selectedGroupedProducts = state => state.shoppingCart.groupedProducts
export const shoppingCartModalState = state => state.shoppingCart.shoppingCartModalIsOpened
export const completedPurchaseModalState = state => state.shoppingCart.completedPurchaseModalIsOpened

// Reducer export
export default shoppingCartSlice.reducer
