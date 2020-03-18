import React, { useEffect, useState } from 'react';
import { TodoContainer, Auth } from './components';
import { auth } from './components/Firebase/firebase';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(user => setIsAuth(user));
  }, [])

  return (
    <BrowserRouter>
      {isAuth ? <Redirect to="/todo" /> : <Redirect to="/auth" />}
      <Route path="/todo" component={TodoContainer} />
      <Route path="/auth" component={Auth} />
    </BrowserRouter>
  );
}
