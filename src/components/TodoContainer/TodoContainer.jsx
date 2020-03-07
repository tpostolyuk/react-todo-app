import React from 'react';
import  s  from './TodoContainer.module.scss';
import TodoBoard from '../TodoBoard/TodoBoard.jsx';
import Switch from '@material-ui/core/Switch';

export const TodoContainer = ({handleDarkMode}) => {
  return (
    <div className={s.todoContainer}>
      <div className={s.todoHeader}>
        <Switch
          onChange={handleDarkMode}
          value="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <h1>React To-Do App</h1>
      </div>
      <div className={s.todoBoard}>
        <TodoBoard />
      </div>
    </div>
  )
}

export default TodoContainer;
