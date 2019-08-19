import * as redux from "redux";
import { clearApp } from "./reset"
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { apiReducer, APIMiddleware } from "api";


const paiemoiApiMiddleware = APIMiddleware();

const middlewareParameters = [
  thunk,
  paiemoiApiMiddleware
];

if (process.env.NODE_ENV === "development") {
	middlewareParameters.push(logger);
}


const reducers = [
  clearApp,
  apiReducer,
]

const reducerFn = (state, action) => {
  return reducers.reduce((previousState, reducer) => reducer(previousState, action), state);
}

export function createStore(initial) {
  return redux.createStore(
    reducerFn,
    initial,
    redux.applyMiddleware(...middlewareParameters)
  )
}
