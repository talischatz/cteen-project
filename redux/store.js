import { configureStore } from '@reduxjs/toolkit'
import shoppingCartSlice from './slices/shoppingCartSlice'
import userSlice from './slices/userSlice'
import { localStorageMiddleware } from '@/lib/middlewares/localStorageMiddleware'
import bannerContentSlice from './slices/bannerContentSlice'
export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice,
    user: userSlice,
    banner: bannerContentSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})
