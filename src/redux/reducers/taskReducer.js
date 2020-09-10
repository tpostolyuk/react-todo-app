import * as actions from '../types';

const initState = {
  activeType: null,
  taskList: [],
  loading: false,
  error: null
}

export const taskReducer = (state = initState, action) => {
  const { payload } = action;
  switch(action.type) {
    case 'CHANGE_TODO_ACTIVE_TYPE':
      return {
        ...state,
        activeType: payload
      }
    case actions.EDIT_TASK:
      return { 
        ...state, 
        taskList: state.taskList.map(
          task => task.id === payload ? {...task, isEditable: true} : task
        )
     }
    case actions.FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actions.FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case actions.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: payload
      }
    case actions.FETCH_SPECIFICALLY_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: payload
      }
    case actions.FETCH_ADDING_TASK_SUCCESS:
      return {
        ...state,
        taskList: [...state.taskList, payload]
      }
    case actions.FETCH_FINISH_EDITING_TASK_REQUEST:
      return {
        ...state
      }
    case actions.FETCH_FINISH_EDITING_TASK_SUCCESS:
      return {
        ...state,
        taskList: state.taskList.map(
          task => task.id === payload.id ? {...task, todo: payload.value, isEditable: false} : task
        )
      }
    case actions.FETCH_FINISH_EDITING_TASK_FAILURE:
      return {
        ...state,
        error: payload
      }
    case actions.FETCH_DELETING_TASK_REQUEST:
      return {
        ...state
      }
    case actions.FETCH_DELETING_TASK_SUCCESS:
      const newArray = state.taskList.filter(item => item.id !== payload)
      return {
        ...state, 
        taskList: newArray
      }
    case actions.FETCH_DELETING_TASK_FAILURE:
      return {
        ...state,
        error: payload
      }
    case actions.FETCH_DONE_TASK_REQUEST:
      return {
        ...state,
      }
    case actions.FETCH_DONE_TASK_SUCCESS:
      return {
        ...state,
        taskList: state.taskList.map(
          task => task.id === payload ? {...task, isDone: !task.isDone} : task
        )
      }
    case actions.FETCH_DONE_TASK_FAILURE:
      return {
        ...state,
        error: payload
      }
    default: return state
  }
}
