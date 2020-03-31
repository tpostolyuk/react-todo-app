import { createSelector } from 'reselect';

const selectAllTasks = state => state.todos.taskList;

export const completedTasks = createSelector(
  selectAllTasks,
  allTasks => allTasks.filter(task => task.isCompleted)
)
