import { baseApi } from "./base-service";

export interface RegisterRequest {
  name: string;
  lname: string;
  email: string;
  phone: string;
  phone_country: string;
  password: string;
  callback_url: string | undefined;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateRequest {
  firstname: string;
  lastname: string;
  address: string;
  avatar: string;
  next_of_kin_name: string;
  next_of_kin_number: string;
  next_of_kin_email: string;
  next_of_kin_relationship: string;
  date_of_birth: string;
  meta: string;
}
// export interface ImageUploadRequest {
//   imgUploadData: FormData;
// }
export interface ForgotPasswordRequest {
  email: string;
  callback_url: string;
  type: string;
}
export interface VerifyAcctRequest {
  token: string;
  email: string;
}
export interface ResendLinkRequest {
  email: string;
  callback_url: string;
  type: string;
}
export interface ResetPasswordRequest {
  email: string;
  password: string;
  token: string;
}
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}
export interface CreatePinRequest {
  pin: number;
  confirm_pin: number;
}
export interface ResetPinRequest {
  old_pin: number;
  pin: number;
  confirm_pin: number;
}

export const authServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, RegisterRequest>({
      query: (body) => {
        return {
          url: `/api/v1/register`,
          method: "POST",
          body: body,
        };
      },
    }),
    loginUser: builder.mutation<any, LoginRequest>({
      query: (body) => {
        return {
          url: `/api/v1/login`,
          method: "POST",
          body: body,
        };
      },
    }),
    updateUser: builder.mutation<any, UpdateRequest>({
      query: (body) => {
        return {
          url: `/api/v1/user`,
          method: "POST",
          body: body,
        };
      },
    }),
    uploadImage: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: `/api/v1/images`,
          method: "POST",
          body: body,
        };
      },
    }),
    forgotPassword: builder.mutation<any, ForgotPasswordRequest>({
      query: (body) => {
        return {
          url: `/api/v1/password/forgot`,
          method: "POST",
          body: body,
          //responseHandler: (response:ApiResponse<AuthResponse>) => response
        };
      },
    }),
    resetPassword: builder.mutation<any, ResetPasswordRequest>({
      query: (body) => {
        return {
          url: `/api/v1/password/reset`,
          method: "PUT",
          body: body,
          //responseHandler: (response:ApiResponse<AuthResponse>) => response
        };
      },
    }),
    changePassword: builder.mutation<any, ChangePasswordRequest>({
      query: (body) => {
        return {
          url: `/api/v1/user/password`,
          method: "PUT",
          body: body,
          //responseHandler: (response:ApiResponse<AuthResponse>) => response
        };
      },
    }),
    getOTP: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: `/web/otp/create`,
          method: "POST",
          body,
        };
      },
    }),
    verifyAccount: builder.mutation<any, VerifyAcctRequest>({
      query: (body) => {
        return {
          url: `/api/v1/verify`,
          method: "POST",
          body,
        };
      },
    }),
    resendLink: builder.mutation<any, ResendLinkRequest>({
      query: (body) => {
        return {
          url: `/api/v1/verify/resend`,
          method: "POST",
          body,
        };
      },
    }),
    createPhoneUser: builder.query<void, any>({
      query: (data) => ({
        url: `/users/profile?phoneNumber=${data.phone}&email=${data.email}`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getUserProfile: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/user`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    deleteCard: builder.mutation<void, string>({
      query: (cardId) => {
        return {
          url: `/api/v1/cards/${cardId}`,
          method: "DELETE",
        };
      },
      // transformResponse: (response: any) => response.data,
    }),
    deleteBank: builder.mutation<void, string>({
      query: (bankId) => {
        return {
          url: `/api/v1/bank-details/${bankId}`,
          method: "DELETE",
        };
      },
      // transformResponse: (response: any) => response.data,
    }),
    createPin: builder.mutation<any, CreatePinRequest>({
      query: (body) => {
        return {
          url: `/api/v1/user/pin`,
          method: "POST",
          body: body,
        };
      },
    }),
    resetPin: builder.mutation<any, ResetPinRequest>({
      query: (body) => {
        return {
          url: `/api/v1/user/reset/pin`,
          method: "PUT",
          body: body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetOTPMutation,
  useVerifyAccountMutation,
  useResendLinkMutation,
  useCreatePhoneUserQuery,
  useGetUserProfileQuery,
  useDeleteCardMutation,
  useDeleteBankMutation,
  useCreatePinMutation,
  useResetPinMutation,
} = authServiceApi;
