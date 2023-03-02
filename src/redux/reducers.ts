import { combineReducers } from "redux";

import { baseApi } from "./services/base-service";
import amountDisplaySliceReducer from "./slices/amountDisplay-slice";
import notificationSliceReducer from "./slices/notification-slice";
import requestBVNSliceReducer from "./slices/requestBVN-slice";
import virtualMembersSliceReducer from "./slices/virtualMembers-slice";
import withdrawalSliceReducer from "./slices/withdrawal-slice";

const rootReducer = combineReducers({
  adashiWebApi: baseApi.reducer,
  notifications: notificationSliceReducer,
  virtualMembers: virtualMembersSliceReducer,
  withdrawalSelection: withdrawalSliceReducer,
  amountDisplay: amountDisplaySliceReducer,
  requestBVN: requestBVNSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
