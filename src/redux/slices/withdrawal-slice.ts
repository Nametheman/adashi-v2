import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface WithdrawalState {
  planId: string;
  planName: string;
  planType: string;
  planCompleted: boolean;
  balance?: any;
}

// to withdraw from a plan, pass plan name, id and modal number
const initialState: WithdrawalState = {
  planId: '',
  planName: '',
  planType: '',
  planCompleted: false,
  balance: 0,
};

export const withdrawalSlice = createSlice({
  name: 'withdrawalSelection',
  initialState,

  reducers: {
    updateWithdrawalPlan: (state, action: PayloadAction<WithdrawalState>) => {
      return { ...action.payload };
    },
    removeWithdrawalPlan: state => {
      return initialState;
    },
  },
});

export const { updateWithdrawalPlan, removeWithdrawalPlan } =
  withdrawalSlice.actions;

export default withdrawalSlice.reducer;
