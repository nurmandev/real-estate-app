import { configureStore } from "@reduxjs/toolkit";
import propertySlice from "./features/propertySlice";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: {
    properties: propertySlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
