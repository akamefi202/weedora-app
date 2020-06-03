import * as types from "./actionTypes";

const initialState = {
  profile: {
    fullName: '',
    phoneNumber: '',
    email: '',
    address: ''
  },
  profileUpdateFlag: false
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.UPDATE_PROFILE:
      var profile = state.profile;

      profile.fullName = action.value.fullName;
      profile.phoneNumber = action.value.phoneNumber;
      profile.email = action.value.email;
      profile.address = action.value.address;
      
      var profileUpdateFlag = state.profileUpdateFlag;

      return { ...state, profile: profile, profileUpdateFlag: !profileUpdateFlag };
    default:
      return state;
  }
}