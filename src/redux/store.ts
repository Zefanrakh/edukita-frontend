import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import assignmentReducer from "./assignmentSlice";
import gradeReducer from "./gradeSlice";
import userReducer from "./userSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    assignment: assignmentReducer,
    grade: gradeReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
