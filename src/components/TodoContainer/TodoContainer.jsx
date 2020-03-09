import React, { useState } from 'react';
import s from './TodoContainer.module.scss';
import TodoBoard from '../TodoBoard/TodoBoard.jsx';
import Button from '@material-ui/core/Button';

export const TodoContainer = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={s.todoContainer} id={darkMode ? s['dark-mode'] : ''}>
      <div className={s.todoHeader}>
        <Button variant="contained" color="primary"
        onClick={() => setDarkMode(!darkMode)}>
          Change the mode
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
