import { createSlice } from "@reduxjs/toolkit";
import { ReducerPayload } from "../type/ReducerPayload";

export interface UserStorePayload {
  login: string;
  avatar_url: string;
}

interface UserState {
  selectedUser?: UserStorePayload;
}

const UserInitialState: UserState = { selectedUser: undefined };

export const userSlice = createSlice({
  name: "user",
  initialState: UserInitialState,
  reducers: {
    storeUser(state, { payload }: ReducerPayload<UserStorePayload>) {
      state.selectedUser = { ...payload };
    },
    resetUser(state) {
      state.selectedUser = undefined;
    },
  },
});

export const { storeUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
