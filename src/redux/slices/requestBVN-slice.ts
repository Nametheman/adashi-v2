import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface BVNstate {
  bvnViewed: boolean;
}

const initialState: BVNstate = {
  bvnViewed: false,
};

export const requestBVNSlice = createSlice({
  name: "requestBVN",
  initialState,

  reducers: {
    updateBVNStatus: (state, action: PayloadAction<boolean>) => {
      state.bvnViewed = action.payload;
    },
  },
});

export const { updateBVNStatus } = requestBVNSlice.actions;

export default requestBVNSlice.reducer;
