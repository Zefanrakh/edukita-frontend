import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ReadAssignmentDto,
  ReadPaginatedAssignmentDto,
} from "../types/dtos/Assignment";
import { apiClient } from "../api/apiClient";
import qs from "qs";
import { Subject } from "../types/enums/Subject.enum";
import { RootState } from "./store";
import { setIsOpen } from "./modalSlice";
import { ReadRecommendationWithAiDto } from "../types/dtos/Grade";

export const fetchAssignments = createAsyncThunk<
  unknown,
  void,
  { state: RootState }
>(
  "assignments/fetchAssignments",
  async (_, { rejectWithValue, getState, requestId: rId, dispatch }) => {
    try {
      const { page, limit, search, subject, loading, requestId } =
        getState().assignment;
      const { user } = getState().auth;
      if (loading && requestId === rId) return;
      const query = qs.stringify({ page, limit, search, subject });
      const studentParam = user?.role === "student" ? `/${user.id}` : "";
      dispatch(setRequestId(rId));
      const response = await apiClient(`/assignments${studentParam}?${query}`);

      return response;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const gradeAssignment = createAsyncThunk<
  unknown,
  {
    grade: number;
    feedback?: string;
  },
  { state: RootState }
>(
  "assignments/gradeAssignment",
  async ({ grade, feedback }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { selectedAssignment } = getState().assignment;
      if (selectedAssignment?.id) {
        await apiClient("/grades", "POST", {
          assignmentId: selectedAssignment.id,
          grade,
          feedback,
        });
        dispatch(setIsOpen(false));
        dispatch(setSelectedAssignment(null));
        dispatch(fetchAssignments());
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const gradeAssignmentWithAI = createAsyncThunk<
  ReadRecommendationWithAiDto,
  void,
  { state: RootState }
>(
  "assignments/gradeAssignmentWithAI",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { selectedAssignment } = getState().assignment;
      if (selectedAssignment?.id) {
        const response = await apiClient(
          `/grades/ai/${selectedAssignment.id}`,
          "GET"
        );
        return response;
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const submitAssignment = createAsyncThunk<
  unknown,
  {
    title: string;
    content: string;
    subject: Subject;
  },
  { state: RootState }
>(
  "assignments/submit",
  async ({ title, content, subject }, { dispatch, rejectWithValue }) => {
    try {
      await apiClient("/assignments", "POST", {
        title,
        content,
        subject,
      });
      dispatch(setIsOpen(false));
      dispatch(setSelectedAssignment(null));
      dispatch(fetchAssignments());
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export interface AssignmentState {
  data: ReadAssignmentDto[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
  search?: string | null;
  subject?: Subject | null;
  requestId?: string | null;
  selectedAssignment?: ReadAssignmentDto | null;
}

const initialState: AssignmentState = {
  data: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 10,
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setPage: (state: AssignmentState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state: AssignmentState, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSearch: (state: AssignmentState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSubject: (state: AssignmentState, action: PayloadAction<Subject>) => {
      state.subject = action.payload;
    },
    setLoading: (state: AssignmentState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedAssignment: (
      state: AssignmentState,
      action: PayloadAction<ReadAssignmentDto | null>
    ) => {
      state.selectedAssignment = action.payload;
    },
    setRequestId(state: AssignmentState, action: PayloadAction<string>) {
      state.requestId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload as ReadPaginatedAssignmentDto;
        state.data = response.data;
        state.total = response.total;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(gradeAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(gradeAssignment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(gradeAssignment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(submitAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitAssignment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitAssignment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(gradeAssignmentWithAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(gradeAssignmentWithAI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(gradeAssignmentWithAI.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setPage,
  setLimit,
  setSearch,
  setSubject,
  setSelectedAssignment,
  setRequestId,
  setLoading,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;
