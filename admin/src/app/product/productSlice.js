import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApi } from "../../api/productClient";

export const uploadProductImg = createAsyncThunk(
  "product/uploadProductImg",
  async (file, thunkAPI) => {
    const result = await productApi.uploadFile(file);
    return result;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (currentProduct, thunkAPI) => {
    const dataProduct = await productApi.createProduct(currentProduct);
    return dataProduct;
  }
);

export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (params, thunkAPI) => {
    const products = await productApi.getAllProduct(params);
    return products;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    const result = await productApi.deleteProduct(id);
    return result;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    currentProduct: null,
    listProduct: [],
    isEditing: false,
    showPopup: false,
    isLoading: false,
  },
  reducers: {
    addingProduct: (state) => {
      state.isEditing = false;
      state.currentProduct = null;
    },
    editingProduct: (state, action) => {
      state.isEditing = true;
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.listProduct = action.payload.products.map((item, index) => ({
        ...item,
        No: index + 1,
      }));
    });
    builder.addCase(getAllProduct.rejected, (state, action) => {
      state.listProduct = [];
    });
  },
});

export const { addingProduct, editingProduct } = productSlice.actions;

export default productSlice.reducer;
