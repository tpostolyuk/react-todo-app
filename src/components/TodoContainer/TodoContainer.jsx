import React from 'react'
import s from './TodoContainer.module.scss'
import { TodoBoard } from '../TodoBoard'

export const TodoContainer = () => {
  return (
    <div className={s.todoContainer}>
      <div className={s.todoHeader}>
        <h1>React To-Do App</h1>
      </div>
      <div className={s.todoBoard}>
        <TodoBoard />
      </div>
    </div>
  )
}
