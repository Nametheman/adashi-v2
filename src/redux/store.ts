/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// import { logoutUser } from "../helpers/authHelper";

import rootReducer from './reducers';
import { baseApi } from './services/base-service';

// function checkTokenExpirationMiddleware({ getState }: any) {
//   return (next: any) => (action: any) => {
//     // console.log("will dispatch", action);

//     // call the next dispatch method in the middleware chain
//     const returnValue = next(action);

//     // console.log("state after dispatch", getState());

//     // This will likely be the action itself, unless
//     // a middleware further in chain changed it.
//     let expiry: any = localStorage.getItem("expiry");
//     // console.log(expiry);
//     const curr = new Date();
//     if (expiry !== null) {
//       next(action);
//       let exp = new Date(expiry);
//       if (curr > exp) {
//         next(action);
//         logoutUser();
//       }
//     }
//     next(action);

//     return returnValue;
//   };
// }

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
  // .concat(checkTokenExpirationMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
