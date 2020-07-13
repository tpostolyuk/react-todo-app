import { createSelector } from './node_modules/reselect';

export const selectAllTasks = state => state.todos.taskList;

export const completedTasks = createSelector(
  selectAllTasks,
  allTasks => allTasks.filter(task => task.isCompleted)
)

export const activeTasks = createSelector(
  selectAllTasks,
  allTasks => allTasks.filter(task => !task.isDone)
)

export const allTasks = createSelector(
  selectAllTasks,
  allTasks => allTasks
)
