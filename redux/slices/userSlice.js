import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  points: '3500',
  email: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.first_name;
    }
  }
})

// Actions
export const { setUser } = userSlice.actions

// Selectors
export const selectUserData = state => state.user

// Reducer export
export default userSlice.reducer
