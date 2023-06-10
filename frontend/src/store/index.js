import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { userApi } from "./apis/userApi"
import { setupListeners } from '@reduxjs/toolkit/query'
import { adminApi } from "./apis/adminApi";
import adminSlice from "./slices/adminSlice";
import { isRejectedWithValue } from '@reduxjs/toolkit'
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log('We got a rejected action!');
  }

  return next(action);
};
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  user: userSlice,
  admin: adminSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, adminApi.middleware, rtkQueryErrorLogger(userApi), rtkQueryErrorLogger(adminApi)),
})
setupListeners(store.dispatch)

export default store
