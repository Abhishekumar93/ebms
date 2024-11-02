import { IUserDetailData } from "@/interface/reduxStore.interface";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addUserDetail: (state, action: PayloadAction<IUserDetailData>) => {
      return action.payload;
    },
    removeUserDetail: (state, action) => {
      return initialState;
    },
  },
});

export const { addUserDetail, removeUserDetail } = userSlice.actions;
export default userSlice;

export const userSelector = (state: {userDetail: IUserDetailData}) => state.userDetail;

export const userDetailSelector = createSelector(
  [userSelector],
  (userDetails) => userDetails
);

export const userNameSelector = createSelector(
  [userSelector],
  (userDetails) => userDetails.name
);

export const userIdSelector = createSelector(
  [userSelector],
  (userDetails) => userDetails.id
);
