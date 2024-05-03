import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../api/orderClient";

export const getAllOrder = createAsyncThunk(
  "order/getAllOrder",
  async (params, thunkAPI) => {
    const result = await orderApi.getAllOrder(params);
    return result;
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (params, thunkAPI) => {
    const result = await orderApi.deleteOrder(params);
    return result;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    listOrder: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.listOrder = [];
      state.listOrder = action.payload.orders.map((item, index) => ({
        ...item,
        No: index + 1,
      }));
    });
    builder.addCase(getAllOrder.rejected, (state, action) => {
      state.listOrder = [];
    });
  },
});

// export const {  } = customerSlice.actions;
export default orderSlice.reducer;
