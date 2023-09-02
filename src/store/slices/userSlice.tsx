import { IUserDetailData } from "@/interface/reduxStore.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserDetailData = {
  id: 0,
  email: "",
  name: "",
  role: "",
};

const userSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    addUserDetail: (state, action) => {
      return action.payload;
    },
    removeUserDetail: (state, action) => {
      return initialState;
    },
  },
});

export const { addUserDetail, removeUserDetail } = userSlice.actions;
export default userSlice.reducer;
