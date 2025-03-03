import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReadUserDto } from "../types/dtos/User";
import { RootState } from "./store";
import { apiClient } from "../api/apiClient";

export interface UserState {
  data: ReadUserDto[];
  requestId?: string | null;
  error: string | null;
  loading: boolean;
  selectedUserId?: number | null;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<unknown, void, { state: RootState }>(
  "grades/fetchUsers",
  async (_, { rejectWithValue, getState, requestId: rId, dispatch }) => {
    try {
      const { loading, requestId } = getState().grade;
      if (loading && requestId === rId) return;
      dispatch(setRequestId(rId));
      const response = await apiClient(`/users/students`);

      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRequestId(state: UserState, action: PayloadAction<string>) {
      state.requestId = action.payload;
    },
    setSelectedUserId(state: UserState, action: PayloadAction<number>) {
      state.selectedUserId = action.payload;
    },
    setLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload as ReadUserDto[];
        state.data = response;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRequestId, setSelectedUserId, setLoading } =
  userSlice.actions;
export default userSlice.reducer;
