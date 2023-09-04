import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_TODO,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_MESSAGE,
} from './types';

import ContentService from '../services/todo.service';

export const setTodo = (username) => (dispatch) => ContentService.getAllTodos(username).then(
  (data) => {
    dispatch({
      type: SET_TODO,
      payload: data,
    });
    return Promise.resolve();
  },
  (error) => {
    const message = getErrorMsg(error);

    return Promise.reject(message);
  }
);

export const addTodo = (payload) => (dispatch) => ContentService.createTodo(payload).then(
  (data) => {
    dispatch({
      type: ADD_TODO,
      payload: data,
    })
    return Promise.resolve();
  },
  (error) => {
    const message = getErrorMsg(error);
    dispatch({ type: SET_MESSAGE, payload: message });
    return Promise.reject();
  }
);

export const editTodo = (payload) => (dispatch) => ContentService.updateTodo(payload).then(
  (data) => {
    dispatch({
      type: EDIT_TODO,
      payload: data,
    });
    return Promise.resolve();
  },
  (error) => {
    const message = getErrorMsg(error);
    dispatch({ type: SET_MESSAGE, payload: message });
    return Promise.reject();
  }
);

export const deleteTodo = (id) => (dispatch) => ContentService.deleteTodo(id).then(
  (response) => {
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
    return Promise.resolve();
  },
  (error) => {
    const message = getErrorMsg(error);
    dispatch({ type: SET_MESSAGE, payload: message });
    return Promise.reject();
  }
);

export const toggleTodo = (payload) => (dispatch) => ContentService.updateTodo(payload).then(
  (response) => {
    dispatch({
      type: TOGGLE_TODO,
      payload,
    });
    return Promise.resolve();
  },
  (error) => {
    const message = getErrorMsg(error);
    dispatch({ type: SET_MESSAGE, payload: message });
    return Promise.reject();
  }
);

const getErrorMsg = (error) => {
  const message = (error.response
    && error.response.data
    && error.response.data.message)
  || error.message
  || error.toString();
  return message;
}
