import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

//disable middleware because it cause error
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
});

// redux store with persisted reducer
const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

const persistor = persistStore(store);

export { store, persistor };
export default store;

//  type for useSelector
export type RootState = ReturnType<typeof store.getState>;
