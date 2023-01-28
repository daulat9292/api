import { createSlice } from "@reduxjs/toolkit";

export const currentState = createSlice({
  name: "currentState",
  initialState: {
    loginOrLogOut: false,
    firstName: " ",
    photo: "",
    role: "",
    Id: "",
    email: "'",
    lastName: "",
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    companyName: "",
    website: "",
    biography: "",
  },

  reducers: {
    selectCurrentState: (state, action) => {
      state.firstName = action.payload.name;
      state.email = action.payload.email;
      state.Id = action.payload._id;
      state.photo = action.payload.photo;
      state.role = action.payload.role;
      state.lastName = action.payload.lastName;
      state.addressOne = action.payload.addressOne;
      state.addressTwo = action.payload.addressTwo;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipCode = action.payload.zipCode;
      state.country = action.payload.country;
      state.companyName = action.payload.companyName;
      state.website = action.payload.website;
      state.biography = action.payload.biography;
    },
    selectUserState: (state, action) => {
      state.loginOrLogOut = action.payload;
    },
  },
});

export const { selectCurrentState, selectUserState } = currentState.actions;

export default currentState.reducer;
