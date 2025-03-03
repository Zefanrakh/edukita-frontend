import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../api/apiClient";
import qs from "qs";
import { Subject } from "../types/enums/Subject.enum";
import { RootState } from "./store";
import { ReadGradeDto, ReadPaginatedGradeDto } from "../types/dtos/Grade";
import { Role } from "../types/enums/Role.enum";

export const fetchGrades = createAsyncThunk<
  unknown,
  void,
  { state: RootState }
>(
  "grades/fetchGrades",
  async (_, { rejectWithValue, getState, requestId: rId, dispatch }) => {
    try {
      const { page, limit, search, subject, loading, requestId } =
        getState().grade;
      let { selectedUserId } = getState().user;
      let { user } = getState().auth;
      if (user?.role === Role.Student) {
        selectedUserId = user.id;
      }
      if (loading && requestId === rId) return;
      const query = qs.stringify({ page, limit, search, subject });
      const studentParam = selectedUserId ? `/${selectedUserId}` : "";
      dispatch(setRequestId(rId));
      const response = await apiClient(`/grades${studentParam}?${query}`);

      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export interface GradeState {
  data: ReadGradeDto[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  search?: string | null;
  subject?: Subject | null;
  requestId?: string | null;
  selectedGrade?: ReadGradeDto | null;
}

const initialState: GradeState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const gradeSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {
    setPage: (state: GradeState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state: GradeState, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSearch: (state: GradeState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSubject: (state: GradeState, action: PayloadAction<Subject>) => {
      state.subject = action.payload;
    },
    setRequestId(state: GradeState, action: PayloadAction<string>) {
      state.requestId = action.payload;
    },
    setLoading: (state: GradeState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedGrade: (
      state: GradeState,
      action: PayloadAction<ReadGradeDto | null>
    ) => {
      state.selectedGrade = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload as ReadPaginatedGradeDto;
        state.data = response.data;
        state.total = response.total;
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setPage,
  setLimit,
  setSearch,
  setSubject,
  setRequestId,
  setLoading,
  setSelectedGrade,
} = gradeSlice.actions;
export default gradeSlice.reducer;
