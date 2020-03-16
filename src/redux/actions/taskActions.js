// import { createAction } from '@reduxjs/toolkit';
import { GET_TASKS, ADD_TASK, EDIT_TASK, REMOVE_TASK, CONFIRM_EDIT_TASK, DONE_TASK, SHOW_COMPLETED_TASKS, SHOW_ACTIVE_TASKS, GET_ACTIVE_TASKS} from '../types';

export const getTasks = payload => {
  return {
    type: GET_TASKS,
    payload
  }
}

export const addTask = payload => {
  return {
    type: ADD_TASK,
    payload
  }
}

export const removeTask = payload => {
  return {
    type: REMOVE_TASK,
    payload
  }
}

export const editTask = payload => {
  return {
    type: EDIT_TASK,
    payload
  }
}

export const doneTask = payload => {
  return {
    type: DONE_TASK,
    payload
  }
}

export const confirmEditTask = payload => {
  return {
    type: CONFIRM_EDIT_TASK,
    payload
  }
}

export const showActiveTasks = payload => {
  return {
    type: SHOW_ACTIVE_TASKS,
    payload
  }
}

export const showCompletedTasks = payload => {
  return {
    type: SHOW_COMPLETED_TASKS,
    payload
  }
};

export const getActiveTasks = payload => {
  return {
    type: GET_ACTIVE_TASKS,
    payload
  }
}
