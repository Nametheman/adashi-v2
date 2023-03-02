import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NotifState {
  value: number;
}

const initialState: NotifState = {
  value: 0,
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    updateNo: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { updateNo } = notificationSlice.actions;

export default notificationSlice.reducer;
