import { configureStore } from '@reduxjs/toolkit'
import shoppingCartSlice from './slices/shoppingCartSlice'
import userSlice from './slices/userSlice'
import { localStorageMiddleware } from '@/lib/middlewares/localStorageMiddleware'

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})
