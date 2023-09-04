import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todo/';
const username = localStorage.getItem('username');

const getAllTodos = () => {
  const data = { createdBy: JSON.parse(localStorage.getItem('user')).username };
  const config = {
    method: 'get',
    url: `${API_URL}all`,
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
    params: data,
  };

  return axios(config)
    .then((response) => response.data);
};

const createTodo = (todo) => {
  const data = {
    title: todo.title,
    createdBy: username   
  }
  const config = {
    method: 'post',
    url: `${API_URL}create`,
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  }
  return axios(config)
    .then((response) => response.data);
};

const getTodo = (todoId) => {
  const data = {
    id: todoId
  }
  const config = {
    method: 'get',
    url: `${API_URL}get`,
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
    params: JSON.stringify(data),
  }
  return axios(config)
    .then((response) => response.data)
    .catch((error) => error);
};

const updateTodo = (todo) => {
  const data = { ...todo }
  const config = {
    method: 'post',
    url: `${API_URL}update`,
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  }
  return axios(config)
    .then((response) => response.data);
};

const deleteTodo = (id) => {
  const data = { id: id };
  const config = {
    method: 'delete',
    url: `${API_URL}delete`,
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
    data: data,
  };
 
  return axios(config)
    .then((response) => response);
};

const printError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

export default {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo
};
