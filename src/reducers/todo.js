import {
  SET_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from '../actions/types';

export default function (state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TODO:
    return [ ...payload ];
  case ADD_TODO:
    return [
      ...state,
      {...payload},
    ];

  case TOGGLE_TODO:
    return state.map((todo) => {
      if (todo.id !== payload.id) {
        return todo;
      }
      return {
        ...todo,
        alerm: payload.alerm,
        completed: !todo.completed,
      };
    });

  case DELETE_TODO:
    return state.filter((todo) => todo.id !== payload);

  case EDIT_TODO:
    return state.map((todo) => {
      if (todo.id !== payload.id) {
        return todo;
      }
      return { ...payload };
    });

  default:
    return state;
  }
}
