import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userClient";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (currentUser, thunkAPI) => {
    const dataUser = await userApi.loginUser(currentUser);
    localStorage.setItem("user", JSON.stringify(dataUser.user));
    localStorage.setItem("token", dataUser.jwtToken);
    return dataUser;
  }
);

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: user ? JSON.parse(user) : null,
    token: token ? token : "",
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.jwtToken;
    });
    builder.addCase(loginUser.rejected, (state, action) => {});
  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
