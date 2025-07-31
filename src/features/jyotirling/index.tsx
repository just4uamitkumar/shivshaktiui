import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getJyotirling } from "./action";
import type { JyotirliingType } from "./type";


export interface JyotirliingState {
  data: JyotirliingType[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: JyotirliingState = {
  data: [
    {
      name: "string",
      city: "string",
      state: "string",
      imgPath: "string",
      description: "string",
      location: { latitude: 0, longitude: 0 },
      history: "string",
    },
  ],
  loading: false,
  error: null,
  success: false,
};

export const jyotirlingSlice = createSlice({
  name: "jyotirling",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getJyotirling.pending, (state: JyotirliingState) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(
        getJyotirling.fulfilled,
        (state: JyotirliingState, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.data = action.payload as JyotirliingType[];
          state.success = true;
        }
      )
      .addCase(
        getJyotirling.rejected,
        (state: JyotirliingState, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "An error occurred";
          state.success = false;
        }
      );
  },
});

export default jyotirlingSlice.reducer;
