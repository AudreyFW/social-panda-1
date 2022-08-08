import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducers';
import { getUsers } from './actions/users.actions';
import { getPosts } from './actions/post.actions';


const store = configureStore({
  reducer: {reducer}
});

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



