import React from 'react';
import { TodoContainer } from './components';
import { BrowserRouter, Route } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={TodoContainer} />
    </BrowserRouter>
  );
}
