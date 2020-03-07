import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger]
})

export default store;