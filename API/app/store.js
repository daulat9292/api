import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { apiContext } from "./apiContext";
import currentStateReducer from "./currentState";

export default configureStore({
  reducer: {
    [apiContext.reducerPath]: apiContext.reducer,
    currentUserState: currentStateReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiContext.middleware),
});
