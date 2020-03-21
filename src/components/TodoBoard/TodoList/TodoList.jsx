import React, { useEffect } from 'react';
import TodoItem from './TodoItem/TodoItem';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import  { Preloader } from '../../Preloader';
import s from './TodoList.module.scss';

const TodoList = ({editTaskMessage, finishEditingTask, deleteTask, handleDoneTask, getCompletedTasks, loading, darkMode}) => {
  const todos  = useSelector(state => {
    if (state.todos.activeType === null) {
      return state.todos.taskList;
    } else {
      if (state.todos.activeType) {
        return state.todos.taskList.filter(i => i.isDone);
      } else {
        return state.todos.taskList.filter(i => !i.isDone);
      }
    }
  });
  
  useEffect(() => {
    getCompletedTasks(todos);
  }, [getCompletedTasks, todos]);

  const todoItems = todos.map(item => {
    return (
      <TodoItem
        darkMode={darkMode}
        id={item.id}
        key={item.id}
        isEditable={item.isEditable}
        isDone={item.isDone}
        taskMessage={item.todo}
        editTaskMessage={editTaskMessage}
        finishEditingTask={finishEditingTask}
        deleteTask={deleteTask}
        handleDoneTask={handleDoneTask}
      />
    )
  })

  return (
    <div className={s['app-todo-list']}>
      {loading && <Preloader className={s['app-todo-list__preloader']} />}
      {todoItems}
    </div>
  )
}

TodoList.propTypes = {
  finishEditingTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleDoneTask: PropTypes.func.isRequired,
  getCompletedTasks: PropTypes.func.isRequired
}

export default TodoList;