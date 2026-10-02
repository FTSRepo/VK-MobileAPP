import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import AttendenceSlice from "./AttendenceSlice";
// import PaymentSlice from "./PaymentSlice";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: UserSlice,
  // attendence:AttendenceSlice,
  // payment:PaymentSlice


});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export const persistor = persistStore(store);
