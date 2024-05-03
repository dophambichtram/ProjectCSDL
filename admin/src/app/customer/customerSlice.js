import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerApi } from "../../api/customerClient";

export const getAllCustomer = createAsyncThunk(
  "customer/getAllCustomer",
  async (params, thunkAPI) => {
    const result = await customerApi.getAllCustomer(params);
    return result;
  }
);

export const deleteUser = createAsyncThunk(
  "customer/deleteUser",
  async (params, thunkAPI) => {
    const result = await customerApi.deleteCustomer(params);
    return result;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    listCustomer: [],
    currentCustomer: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      state.listCustomer = [];
      state.listCustomer = action.payload.users.map((item, index) => ({
        ...item,
        No: index + 1,
      }));
    });
    builder.addCase(getAllCustomer.rejected, (state, action) => {
      state.listCustomer = [];
    });
  },
});

// export const {  } = customerSlice.actions;
export default customerSlice.reducer;
