import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  points: '3500',
  email: null,
  isAuthenticated: false,

}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.first_name;
      state.email = payload.email;
      state.isAuthenticated = true; 
      console.log('Nuevo estado de usuario en Redux:', JSON.parse(JSON.stringify(state)));
    }
  }
});

// Actions
export const { setUser } = userSlice.actions

// Selectors
export const selectUserData = state => state.user

// Reducer export
export default userSlice.reducer
