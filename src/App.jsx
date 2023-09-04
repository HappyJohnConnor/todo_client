import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';

import AuthService from './services/auth.service';
import AddForm from './components/todo/AddForm';
import TodoList from './components/todo/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import { PrivateRoute, GuestRoute } from './components/Routing';
import ErrorBoudary from './ErrorBoundary';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { SET_MESSAGE } from './actions/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const App = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const handleProfile = () => {};

  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    props.history.push('/login');
    window.location.reload();
  };

  const handleClose = () => {
    dispatch({ type: SET_MESSAGE, payload: null });
  }

  const Main = () => {
    return (
      <ErrorBoudary>
        <AddForm className="Form" />
        <Suspense fallback={<div>Fetching data ... </div>}>
          <TodoList />
        </Suspense>
      </ErrorBoudary>
    );
  };

  const Header = () => {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Todo App
            </Typography>
            {isLoggedIn ? <IsLoggedIn /> : <NotLoggedIn />}
          </Toolbar>
        </AppBar>
        {message && (
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
          )}
      </div>
    )
  }

  const IsLoggedIn = () => {
    console.log(user);
    return (
      <Typography>
        <Button color="inherit" onClick={handleProfile}>
          {user.username}
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Typography>
    );
  };

  const NotLoggedIn = () => {
    return (
      <Typography>
        <Button color="inherit" href="/register">
          Sign up
        </Button>
        <Button color="inherit" href="/login">
          Login
        </Button>
      </Typography>
    );
  };

  return (
    <BrowserRouter>
      <Header />
      <Container maxWidth="md">
        <Switch>
          <PrivateRoute exact path={['/', '/home']} children={<Main />} />
          <GuestRoute exact path="/login" children={<Login />} />
          <Route exact path="/register" children={<Register />} /> 
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default withRouter(App);
