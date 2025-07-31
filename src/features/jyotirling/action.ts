import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI } from "./api";

export const getJyotirling = createAsyncThunk(
  `jyotirling/getData`,
  async () => {
    const response = await getAPI();
    return response;
  }
);
