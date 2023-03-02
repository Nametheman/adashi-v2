import { baseApi } from "./base-service";

export interface AddTargetGroupRequest {
  name: string;
  target_amount: number;
  no_of_participants: number;
  description?: string | null;
  start_date: string;
  end_date: string;
  callback_url: string;
  data: string[];
}

export interface AddCoopGroupRequest {
  name: string;
  amount: number;
  plan: string;
  day_of_month: number;
  day_of_week: number;
  hour_of_day: number;
  no_of_participants: number;
  description?: string | null;
  start_date: string;
  end_date: string;
  bot: boolean;
  no_of_bot: number;
  callback_url: string;
  data: string[];
}

export interface JoinCoopGroupRequest {
  status: boolean;
  group_saving_id: string;
  payment_auth?: string;
  payout_order?: number;
}

export interface AddIndSavingRequest {
  name: string;
  amount: number;
  target_amount: number;
  plan: string;
  day_of_month: number;
  day_of_week: number;
  hour_of_day: number;
  payment_auth: string;
  start_date: string;
  end_date: string;
}

export interface EditIndPlanRequest {
  saving_cycle_id: string;
  status: string;
  name: string;
  amount: number;
  target_amount: number;
  plan: string;
  day_of_month: number;
  day_of_week: number;
  hour_of_day: number;
  payment_auth: string;
  end_date: string;
}

export interface RolloverIndPlanRequest {
  saving_cycle_id: string;
  end_date: string;
}

export interface RolloverCoopGrpRequest {
  group_id: string;
  data: string[];
}

export interface EditCoopGroupRequest {
  planId: string;
  payment_auth: string;
}

export interface SetTargetGroupFreqRequest {
  status: boolean;
  target_group_saving_id: string;
  payment_auth?: string;
  day_of_month?: number;
  day_of_week?: number;
  hour_of_day?: number;
  plan?: string;
  amount?: number;
}

export const savingServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addIndSaving: builder.mutation<any, AddIndSavingRequest>({
      query: (body) => {
        return {
          url: `/api/v1/saving-plans`,
          method: "POST",
          body: body,
        };
      },
    }),
    getIndSavingsAll: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/saving-plans`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getIndSavings: builder.query<void, string>({
      query: (planId) => ({
        url: `/api/v1/saving-plans/${planId}`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    deleteIndPlan: builder.mutation<void, string>({
      query: (planId) => {
        return {
          url: `/api/v1/saving-plans/${planId}`,
          method: "DELETE",
        };
      },
      // transformResponse: (response: any) => response.data,
    }),
    editIndPlan: builder.mutation<any, EditIndPlanRequest>({
      query: (body) => {
        return {
          url: `/api/v1/saving-plans`,
          method: "PUT",
          body: body,
          //responseHandler: (response:ApiResponse<AuthResponse>) => response
        };
      },
    }),
    rolloverIndPlan: builder.mutation<any, RolloverIndPlanRequest>({
      query: (body) => {
        return {
          url: `/api/v1/saving-plans/rollover`,
          method: "PUT",
          body: body,
        };
      },
    }),
    getCoopGroupCreated: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/group-savings`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getCoopGroupJoined: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/group-savings/joined-groups/all`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getCoopGroupInvites: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/group-savings/pending/invitations`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getCoopGroup: builder.query<void, string>({
      query: (planId) => ({
        url: `/api/v1/group-savings/${planId}/participant`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    addCoopGroup: builder.mutation<any, AddCoopGroupRequest>({
      query: (body) => {
        return {
          url: `/api/v1/group-savings`,
          method: "POST",
          body: body,
        };
      },
    }),
    joinCoopGroup: builder.mutation<any, JoinCoopGroupRequest>({
      query: (body) => {
        return {
          url: `/api/v1/group-savings/join-group`,
          method: "POST",
          body: body,
        };
      },
    }),
    editCoopGroup: builder.mutation<any, EditCoopGroupRequest>({
      query: (body) => {
        return {
          url: `/api/v1/group-savings/${body.planId}/update`,
          method: "PUT",
          body: body.payment_auth,
          //responseHandler: (response:ApiResponse<AuthResponse>) => response
        };
      },
    }),
    rollOverCoopGroup: builder.mutation<void, RolloverCoopGrpRequest>({
      query: (body) => {
        return {
          url: `/api/v1/group-savings/rollover`,
          method: "PUT",
          body: body,
        };
      },
      // transformResponse: (response: any) => response.data,
    }),
    deleteCoopGroup: builder.mutation<void, string>({
      query: (planId) => {
        return {
          url: `/api/v1/group-savings/${planId}/delete`,
          method: "DELETE",
        };
      },
      // transformResponse: (response: any) => response.data,
    }),
    getTarGroupCreated: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/target-group-savings`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getTarGroup: builder.query<void, string>({
      query: (planId) => ({
        url: `/api/v1/target-group-savings/${planId}/participant`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getTarGroupJoined: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/target-group-savings/joined-groups/all`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    getTarGroupInvites: builder.query<void, void>({
      query: () => ({
        url: `/api/v1/target-group-savings/pending/invitations`,
      }),
      transformResponse: (response: any) => response.data,
    }),
    addTargetGroup: builder.mutation<any, AddTargetGroupRequest>({
      query: (body) => {
        return {
          url: `/api/v1/target-group-savings`,
          method: "POST",
          body: body,
        };
      },
    }),
    editTargetGroup: builder.mutation<any, EditCoopGroupRequest>({
      query: (body) => {
        return {
          url: `/api/v1/group-savings/${body.planId}/update`,
          method: "PUT",
          body: body.payment_auth,
          //responseHandler: (response:ApiResponse<AuthResponse>) => response
        };
      },
    }),
    deleteTargetGroup: builder.mutation<void, string>({
      query: (planId) => {
        return {
          url: `/api/v1/target-group-savings/${planId}/delete`,
          method: "DELETE",
        };
      },
      // transformResponse: (response: any) => response.data,
    }),
    setTargetGroupFreq: builder.mutation<any, SetTargetGroupFreqRequest>({
      query: (body) => {
        return {
          url: `/api/v1/target-group-savings/join-group`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const {
  useAddIndSavingMutation,
  useGetIndSavingsAllQuery,
  useGetIndSavingsQuery,
  useDeleteIndPlanMutation,
  useEditIndPlanMutation,
  useRolloverIndPlanMutation,
  useGetCoopGroupCreatedQuery,
  useGetCoopGroupJoinedQuery,
  useGetCoopGroupQuery,
  useAddCoopGroupMutation,
  useJoinCoopGroupMutation,
  useEditCoopGroupMutation,
  useDeleteCoopGroupMutation,
  useRollOverCoopGroupMutation,
  useGetCoopGroupInvitesQuery,
  useGetTarGroupQuery,
  useGetTarGroupCreatedQuery,
  useGetTarGroupJoinedQuery,
  useGetTarGroupInvitesQuery,
  useAddTargetGroupMutation,
  useEditTargetGroupMutation,
  useDeleteTargetGroupMutation,
  useSetTargetGroupFreqMutation,
} = savingServiceApi;
