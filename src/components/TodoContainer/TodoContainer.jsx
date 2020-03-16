import React, { useState } from 'react';
import s from './TodoContainer.module.scss';
import TodoBoard from '../TodoBoard/TodoBoard.jsx';
import Button from '@material-ui/core/Button';
import { auth } from '../Firebase/firebase';

export const TodoContainer = () => {
  const [darkMode, setDarkMode] = useState(false);

  const signOut = e => {
    e.preventDefault();
    const promise = auth.signOut();
    promise
      .then(() => console.log('Successfuly signed out!'))
      .catch(e => console.log(e.message, e.status));
  }

  return (
    <div className={s.todoContainer} id={darkMode ? s['dark-mode'] : ''}>
      <div className={s.todoHeader}>
        <Button variant="contained" color="primary"
          onClick={() => setDarkMode(!darkMode)}>
          Change the mode
        </Button>
        <Button 
          variant="contained"
          color="primary"
          onClick={e => signOut(e)}>
          Sign Out
        </Button>
        <h1>React To-Do App</h1>
      </div>
      <div className={s.todoBoard}>
        <TodoBoard darkMode={darkMode} />
      </div>
    </div>
  )
}

export default TodoContainer;
