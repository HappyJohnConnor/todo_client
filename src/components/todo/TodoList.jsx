import React, {useEffect, useState} from 'react';
import { connect, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TodoListItem from './TodoListItem';
import store from '../../store';
import { setTodo } from '../../actions/todo';
import { SET_MESSAGE, LOGOUT } from '../../actions/types';

import List from '@material-ui/core/List';

const TodoList = ({ todoIds, setTodo, setMessage, logout }) => {

  useEffect(() => {
    let unmounted = false;
    let data = null;
    const f = async () => {
      try {
        data = await setTodo();
      } catch(err) {
        setMessage(err);
        logout();
      }
    };
    f();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, []);

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return (
    <Provider store={store}>
      <List className="list-group">{renderedListItems}</List>
    </Provider>
  );
};

const mapStatetoProps = (state) => {
  return {
    todoIds: state.todo.map((todo) => todo.id),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTodo: () => dispatch(setTodo()),
    setMessage: (message) => dispatch({ type: SET_MESSAGE, payload: message }),
    logout: () => dispatch({type: LOGOUT})
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(TodoList);
