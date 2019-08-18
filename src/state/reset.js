import Constants from "./actions/constants";

export function clearApp(state, action) {
  if(action.type !== Constants.APP.RESET) {
    return state;
  }

  if(state.connect) {
    return { connect: state.connect }
  }

   return {};
}
