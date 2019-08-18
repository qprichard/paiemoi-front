import Constants from "./constants";

/**
 * Reset all stores of the app
 * @return {Object} - Action to reset the application
**/

export const clearApp =() => ({
  type: Constants.APP.RESET
});
