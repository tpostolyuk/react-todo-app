import React, { memo } from 'react';
import TodoItem from './TodoItem/TodoItem';
import PropTypes from 'prop-types';
import  { Preloader } from '../../Preloader';
import s from './TodoList.module.scss';
import { Modal } from '../../Modal/Modal';

const TodoList = memo(({editTaskMessage, finishEditingTask, deleteTask, handleDoneTask, todos, loading, darkMode}) => {

  const todoItems = todos.map(item => {
    return (
      <React.Fragment key={item.id}>
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
      <Modal title={item.todo} description={item.description} />
      </React.Fragment>
    )
  })

  return (
    <div className={s['app-todo-list']}>
      {loading && <Preloader className={s['app-todo-list__preloader']} />}
      {todoItems}
    </div>
  )
})

TodoList.propTypes = {
  finishEditingTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleDoneTask: PropTypes.func.isRequired,
}

export default TodoList;