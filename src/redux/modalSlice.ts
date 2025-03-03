import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormType = "submit" | "grade" | "gradeView";

export interface ModalState {
  isOpen: boolean;
  formType?: FormType;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpen: (
      state: ModalState,
      action: PayloadAction<boolean | undefined>
    ) => {
      const forcedState = action.payload;
      state.isOpen =
        forcedState !== undefined && forcedState !== null
          ? forcedState
          : !state.isOpen;
    },
    setFormType: (state: ModalState, action: PayloadAction<FormType>) => {
      state.formType = action.payload;
    },
  },
});

export const { setIsOpen, setFormType } = modalSlice.actions;
export default modalSlice.reducer;
