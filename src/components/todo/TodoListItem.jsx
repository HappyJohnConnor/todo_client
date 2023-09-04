import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';

import DateFormDialog from './DateFormDialog';
import { deleteTodo, editTodo } from '../../actions/todo';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

const selectTodoById = (state, todoId) => {
  return state.todo.find((todo) => todo.id === todoId);
};

const TodoListItem = ({ id, deleteTodo, editTodo }) => {
  const classes = useStyles();

  const todo = useSelector((state) => selectTodoById(state, id));
  const { title, completed, alerm } = todo;

  const [inputText, setInputtext] = useState(title);
  const [editing, setEditMode] = useState(false);

  const handleDoneClick = () => {
    //edit todo item
    editTodo({ ...todo, title: inputText });
    //change to edit false
    setEditMode(!editing);
  };

  const handleDeleteClick = () => {
    deleteTodo(id);
  }

  const handleSetAlermClick = (alerm) => {
    const todo = {
      id: id,
      completed: !completed,
      alerm: alerm
    }
    editTodo(todo);
    const diff = alerm.getTime() - new Date().getTime();
    if (diff > 0) {
      setTimeout(() => {
        alert(title);
        editTodo({id:id, completed: !completed});
      }, diff);
    } else {
      editTodo({id:id, completed: !completed});
    }
  }

  const handleChange = (e) => {
    setInputtext(e.target.value);
  };

  return (
    <ListItem className="list-group-item">
      <div className="titleBox">
        {editing ? (
          //Todo title Box
          <TextField
            id="titleInput"
            defaultValue={title}
            onChange={handleChange}
          />
        ) : (
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline}>
                  {inputText}
                </Typography>
              </React.Fragment>
            }
          />
        )}
      </div>
      <ListItemSecondaryAction>
        <Grid container spacing={1}>
          <Grid item>
            <DeleteIcon onClick={handleDeleteClick} />
          </Grid>
          <Grid item>
            {editing ? (
              <DoneIcon onClick={handleDoneClick} />
            ) : (
              <EditIcon onClick={() => setEditMode(!editing)} />
            )}
          </Grid>
          <Grid item>
            <DateFormDialog alerm={alerm} handleSetAlermClick={handleSetAlermClick} title={title}/>
          </Grid>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) =>
      dispatch(deleteTodo(id)),
    editTodo: (todo) =>
      dispatch(editTodo(todo)),
  };
};

export default connect(null, mapDispatchToProps)(TodoListItem);
