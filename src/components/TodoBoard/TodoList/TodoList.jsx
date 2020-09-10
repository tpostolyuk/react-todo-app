import React, { memo } from 'react'
import PropTypes from 'prop-types'
import s from './TodoList.module.scss'
import { TodoItem } from './TodoItem'
import { Preloader } from '../../Preloader'

export const TodoList = memo(({ editTaskMessage, finishEditingTask, deleteTask, handleDoneTask, todos, loading }) => {
  const todoItems = todos.map(item => {
    return (
      <TodoItem
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
})

TodoList.propTypes = {
  finishEditingTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleDoneTask: PropTypes.func.isRequired,
}
