import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'Joaquin',
  points: 3500,
  email: 'joaquin.retola@gmail.com'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state = payload
    }
  }
})

// Actions
export const { setUser } = userSlice.actions

// Selectors
export const selectUserData = state => state.user

// Reducer export
export default userSlice.reducer
