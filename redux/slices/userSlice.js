import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  points: null,
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
      state.points = payload.points;
      console.log('payload: ',payload);
      state.isAuthenticated = true; 
      console.log('Nuevo estado de usuario en Redux:', JSON.parse(JSON.stringify(state)));
    }
  }
});

// Actions
export const { setUser } = userSlice.actions

export const loadUserFromLocalStorage = () => async (dispatch) => {
  const storedUserData = localStorage.getItem('userData');
  console.log('storeduserdata: ', storedUserData);
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    if (userData.points !== undefined) {
      dispatch(setUser(userData));
    } else {
      console.error('El campo "points" está definido como undefined en userData.');
    }
  }
};




// Selectors
export const selectUserData = state => state.user


// Reducer export
export default userSlice.reducer
