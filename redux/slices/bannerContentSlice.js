import { createSlice } from '@reduxjs/toolkit';

export const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    isSuccessModalVisible: false,
  },
  reducers: {
    setSuccessModalVisible: (state, action) => {
      state.isSuccessModalVisible = action.payload;
    },
  },
});

export const { setSuccessModalVisible } = bannerSlice.actions;

export const selectIsSuccessModalVisible = (state) => state.banner.isSuccessModalVisible;

export default bannerSlice.reducer;
