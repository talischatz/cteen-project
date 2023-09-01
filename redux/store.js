import { configureStore } from '@reduxjs/toolkit'
import shoppingCartSlice from './slices/shoppingCartSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice,
    user: userSlice
  },
})
