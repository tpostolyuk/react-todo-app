import React from 'react';
import { TodoContainer } from './components/TodoContainer/TodoContainer';
import { BrowserRouter, Route } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={TodoContainer} />
    </BrowserRouter>
  );
}
