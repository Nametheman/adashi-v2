import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface VMState {
  value: boolean;
}

const initialState: VMState = {
  value: false,
};

export const virtualMembersSlice = createSlice({
  name: "virtualMembers",
  initialState,

  reducers: {
    updateVMState: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { updateVMState } = virtualMembersSlice.actions;

export default virtualMembersSlice.reducer;
