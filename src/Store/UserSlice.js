import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  UserProfile: {},
  isAuthenticated: false,
  AuthInfo: {},
  DashboardInfo: {},
  DeviceToken:"",
  UserDeviceToken:false,
  MaintainanceMsg:"",
  Maintainance:""

};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated =
        action.payload?.isAuthenticated || state.isAuthenticated;
      state.UserProfile = action.payload?.UserProfile || state.UserProfile;
      state.AuthInfo = action.payload?.AuthInfo || state.AuthInfo;
    },
    setProfilePic: (state, action) => {
      state.UserProfile.profilePic =
        action?.payload || state.UserProfile.profilePic;
    },
    setDashboardInfo: (state, action) => {
      state.DashboardInfo = action.payload;
    },

    removeAuth: (state) => {
      state.isAuthenticated = false;
      state.UserInfo = {};
      state.AuthInfo = {};
      state.DashboardInfo = {};
      state.UserDeviceToken= false
    },
    appCheck: (state, action) => {
      state.AppCheck = action.payload;
    },
    setToken:(state, action)=>{
      state.DeviceToken= action.payload
    },
    setUserDeviceToken:(state , action)=>{
      state.UserDeviceToken=action.payload
    },
    setMaintainence:(state , action)=>{
      state.Maintainance=action.payload.Maintainance
      state.MaintainanceMsg=action.payload.MaintainanceMsg

    }
  },
});

export const {
  setAuth,
  removeAuth,
  setUserInfo,
  setUserProfile,
  appCheck,
  setProfilePic,
  setDashboardInfo,
  setToken,
  setUserDeviceToken,
  setMaintainence
} = userSlice.actions;

export default userSlice.reducer;
