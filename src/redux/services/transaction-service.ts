import { baseApi } from './base-service';

export interface TransactionHistoryRequest {
  //   userId: string;
  pageNo?: number;
  pageSize?: number;
  status?: string;
  duration?: any;
}

export interface AddCardRequest {
  reference: string;
  ref: string;
  channel: string;
}

export interface AddBankRequest {
  account_number: string;
  bank_code: string;
  bvn: string;
}
export interface ResolveBankRequest {
  account_number: string;
  bank_code: string;
}

export interface WalletToPlanRequest {
  saving_cycle_id: string;
  amount: number;
  pin: null | number;
}

export interface WalletToBankRequest {
  bank_detail_id: string;
  amount: number;
  channel: string;
  pin: null | number;
}

export interface BankToWalletRequest {
  payment_gateway_id: string;
  amount: number;
  pin: null | number;
}

export interface PlanToBankRequest {
  saving_cycle_id: string;
  amount: number;
  bank_detail_id: string;
  pin: null | number;
}

export interface BankToPlanRequest {
  saving_cycle_id: string;
  amount: number;
  payment_gateway_id: string;
  pin: null | number;
}
export interface VerifyTransactionRequest {
  user_id: string;
  group_id: string;
  reference: string;
}

export const transactionServiceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    transactionHistoryStatus: builder.query<void, string>({
      query: status => ({
        url: `/api/v1/transactions?filter[status]=${status}`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    transactionHistoryAll: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/transactions`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    transactionHistory: builder.query<void, TransactionHistoryRequest>({
      query: ({ pageNo, pageSize, status, duration }) => ({
        url: `/api/v1/transactions?page=${pageNo}&size=${pageSize}&filter[status]=${status}&filter[created_between]=${duration}`,
        // url: `/api/v1/transactions?page[size]=${body.pageSize}&page=${body.page}`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getCardData: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/cards`,
      }),
      transformResponse: (response: any) => response,
    }),
    initializeCard: builder.mutation<any, any>({
      query: body => {
        return {
          url: `/api/v1/cards/initialize`,
          method: 'POST',
          body: body,
        };
      },
    }),
    addCard: builder.mutation<any, AddCardRequest>({
      query: body => {
        return {
          url: `/api/v1/cards`,
          method: 'POST',
          body: body,
        };
      },
    }),
    getBankList: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/bank-details/banks`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    addBank: builder.mutation<any, AddBankRequest>({
      query: body => {
        return {
          url: `/api/v1/bank-details`,
          method: 'POST',
          body: body,
        };
      },
    }),
    resolveBank: builder.query<void, ResolveBankRequest>({
      query: ({ account_number, bank_code }) => ({
        url: `/api/v1/bank-details/resolve?account_number=${account_number}&bank_code=${bank_code}`,
      }),
      transformResponse: (response: any) => response,
    }),
    getBankData: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/bank-details`,
      }),
      transformResponse: (response: any) => response,
    }),
    walletToBank: builder.mutation<any, WalletToBankRequest>({
      query: body => {
        return {
          url: `/api/v1/withdrawals`,
          method: 'POST',
          body: body,
        };
      },
    }),
    walletToInd: builder.mutation<any, WalletToPlanRequest>({
      query: body => {
        return {
          url: `/api/v1/wallet/transfer/savings`,
          method: 'POST',
          body: body,
        };
      },
    }),
    walletToTarget: builder.mutation<any, WalletToPlanRequest>({
      query: body => {
        return {
          url: `/api/v1/wallet/transfer/target`,
          method: 'POST',
          body: body,
        };
      },
    }),
    bankToWallet: builder.mutation<any, BankToWalletRequest>({
      query: body => {
        return {
          url: `/api/v1/wallet/topup/bank`,
          method: 'POST',
          body: body,
        };
      },
    }),
    bankToInd: builder.mutation<any, BankToPlanRequest>({
      query: body => {
        return {
          url: `/api/v1/saving-plans/topup/bank`,
          method: 'POST',
          body: body,
        };
      },
    }),
    bankToTarget: builder.mutation<any, BankToPlanRequest>({
      query: body => {
        return {
          url: `/api/v1/target-group-savings/topup/bank`,
          method: 'POST',
          body: body,
        };
      },
    }),
    indToWallet: builder.mutation<any, WalletToPlanRequest>({
      query: body => {
        return {
          url: `/api/v1/saving-plans/withdraw/stash`,
          method: 'POST',
          body: body,
        };
      },
    }),
    indToBank: builder.mutation<any, PlanToBankRequest>({
      query: body => {
        return {
          url: `/api/v1/saving-plans/withdraw/bank`,
          method: 'POST',
          body: body,
        };
      },
    }),
    targetToWallet: builder.mutation<any, WalletToPlanRequest>({
      query: body => {
        return {
          url: `/api/v1/target-group-savings/withdraw/stash`,
          method: 'POST',
          body: body,
        };
      },
    }),
    targetToBank: builder.mutation<any, PlanToBankRequest>({
      query: body => {
        return {
          url: `/api/v1/target-group-savings/withdraw/bank`,
          method: 'POST',
          body: body,
        };
      },
    }),
    verifyTransaction: builder.mutation<any, VerifyTransactionRequest>({
      query: body => ({
        url: `/api/v1/group-savings/payment/checkout`,
        method: 'POST',
        body: body,
      }),
    }),
    withdrawCommission: builder.mutation<any, { amount: number }>({
      query: body => ({
        url: `/api/v1/withdrawals/commission`,
        method: 'POST',
        body: body,
      }),
    }),
    indWithdrawalCommission: builder.mutation<any, any>({
      query: body => ({
        url: `/api/v1/saving-plans/withdraw/commission`,
        method: 'POST',
        body: body,
      }),
    }),
    targetWithdrawalCommission: builder.mutation<any, any>({
      query: body => ({
        url: `/api/v1/target-group-savings/withdraw/commission`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useTransactionHistoryStatusQuery,
  useTransactionHistoryAllQuery,
  useTransactionHistoryQuery,
  useGetCardDataQuery,
  useInitializeCardMutation,
  useAddCardMutation,
  useGetBankListQuery,
  useAddBankMutation,
  useResolveBankQuery,
  useGetBankDataQuery,
  useWalletToBankMutation,
  useWalletToIndMutation,
  useWalletToTargetMutation,
  useBankToWalletMutation,
  useBankToIndMutation,
  useBankToTargetMutation,
  useIndToWalletMutation,
  useIndToBankMutation,
  useTargetToWalletMutation,
  useTargetToBankMutation,
  useVerifyTransactionMutation,
  useWithdrawCommissionMutation,
  useTargetWithdrawalCommissionMutation,
  useIndWithdrawalCommissionMutation,
} = transactionServiceApi;
