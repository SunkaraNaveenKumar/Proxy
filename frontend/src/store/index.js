import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import userApi from "./apis/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import adminApi from "./apis/adminApi";
import adminSlice from "./slices/adminSlice";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
// const rtkQueryErrorLogger = (api) => (store) => (next) => (action) => {
//   if (isRejectedWithValue(action)) {
//     // console.log(action);
//     if (
//       action?.payload?.status === 401 ||
//       action?.payload?.originalStatus === 401 ||
//       action?.payload?.originalStatus === 404
//     ) {
//       console.log("error :", action.payload.data);
//       // const navigate = useNavigate()
//       const token = localStorage.getItem("token");
//       if (token) {
//         const role = jwt_decode(token)?.role;
//         window.location.pathname = `/${role}/login`;
//       }
//       alert("please login again , you are not authoeized");
//       localStorage.removeItem("token");
//     }
//   }
//   return next(action);
// };

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  user: userSlice,
  admin: adminSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      adminApi.middleware,
      // rtkQueryErrorLogger(userApi),
      // rtkQueryErrorLogger(adminApi)
    ),
});

setupListeners(store.dispatch);

export default store;
