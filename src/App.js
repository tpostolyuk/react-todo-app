import React, { useEffect, useState } from 'react';
import { TodoContainer, Auth } from './components';
import { auth } from './components/Firebase/firebase';
import { BrowserRouter } from 'react-router-dom';
export const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged(user => setIsAuth(user));
  }, [])

  return (
    <BrowserRouter>
      {isAuth ? <TodoContainer /> : <Auth />}
    </BrowserRouter>
  );
}
