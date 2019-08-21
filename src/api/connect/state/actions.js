import { fetch_ as fetchAPI, checkLocalStorage , clearLocalStorage } from "./fetch";
import User from "models/user";

export const REQUEST_LOGIN = Symbol('CONNECT.REQUEST_LOGIN');
export const SUCCESS_LOGIN = Symbol('CONNECT.SUCCESS_LOGIN');
export const ERROR_LOGIN = Symbol('CONNECT.ERROR_LOGIN');
export const CLEAR = Symbol('CONNECT.CLEAR');


function getToken({ connect }) {
  if(!connect) {
    return null;
  }
  return { token: connect.token };
}

export function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    connect: { pending: true, isLogged: false }
  }
}

export function succesLogin({ token, user }) {
  return {
    type: SUCCESS_LOGIN,
    connect: {
      token,
      user,
      isLogged: true,
      pending: false,
     }
  }
}

export function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    error,
    connect: {
      pending: false,
      isLogged: false,
    }
  }
}

export function clear(){
  return {
    type: CLEAR,
    connect: {}
  }
}

export function login(data) {
  return (dispatch, getState) => {
    dispatch(requestLogin())
    fetchAPI({ data }).then(
      (response) => {
        dispatch(succesLogin(response))
      }
    ).catch(
      (err) => {
        dispatch(errorLogin(err))
      }
    );
  }
}

export function logout(){
  return async (dispatch) => {
    await clearLocalStorage();
    dispatch(clear());
  }
}

export function getAuthorizationHeader(state) {
  return getToken(state);
}

export function updateTokenFromLocalStorage() {
  return (dispatch) => {
    dispatch(requestLogin());
    checkLocalStorage().then(
      (localStorage) => {
        if(!localStorage) {
          dispatch(errorLogin('no Local storage'))
        } else {
          dispatch(succesLogin(localStorage))
        }
      }
    ).catch(
      (err) => dispatch(errorLogin(err))
    )
  }
}

export function isLogged(state) {
  const { connect } = state;

  return Boolean(connect && connect.isLogged);
}

export function isPending(state) {
  const { connect } = state;
  return Boolean(connect && connect.pending);
}

export function getConnectedUser(state) {
  const { connect } = state;
  if(connect && connect.user) {
    return new User(connect.user);
  }
  return null;
}
