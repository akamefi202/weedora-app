import * as types from "./actionTypes";

const initialState = {
  screens: [
    'Home'
  ]
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.PUSH_SCREEN:
      var screens = state.screens;
      if (screens[screens.length - 1] != action.value)
        screens.push(action.value);

      if (screens.length > 10)
        screens.splice(0, 1);

      return { ...state, screens: screens };
    case types.POP_SCREEN:
      var screens = state.screens;
      screens.pop();

      return { ...state, screens: screens}
    default:
      return state;
  }
}