import { createSlice } from "@reduxjs/toolkit";

export interface ADState {
  asteriskStatus: boolean;
}

const initialState: ADState = {
  asteriskStatus: false,
};

export const amountDisplaySlice = createSlice({
  name: "amountDisplay",
  initialState,

  reducers: {
    updateStatus: (state) => {
      state.asteriskStatus = !state.asteriskStatus;
    },
  },
});

export const { updateStatus } = amountDisplaySlice.actions;

export default amountDisplaySlice.reducer;
