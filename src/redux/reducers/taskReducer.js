import { EDIT_TASK, FETCH_TASKS_REQUEST, 
         FETCH_TASKS_FAILURE, FETCH_TASKS_SUCCESS, 
         FETCH_ADDING_TASK_SUCCESS, FETCH_FINISH_EDITING_TASK_REQUEST, 
         FETCH_FINISH_EDITING_TASK_FAILURE, FETCH_FINISH_EDITING_TASK_SUCCESS, 
         FETCH_DELETING_TASK_REQUEST, FETCH_DELETING_TASK_SUCCESS, 
         FETCH_DELETING_TASK_FAILURE, FETCH_DONE_TASK_REQUEST, 
         FETCH_DONE_TASK_SUCCESS, FETCH_DONE_TASK_FAILURE,
         FETCH_SPECIFICALLY_TASKS_SUCCESS} from '../types';

const initState = {
  activeType: null,
  taskList: [],
  loading: false,
  error: null
};

const taskReducer = (state = initState, action) => {
  const { payload } = action;
  switch(action.type) {
    case 'CHANGE_TODO_ACTIVE_TYPE':
      return {
        ...state,
        activeType: payload
      }
    case EDIT_TASK:
      return { 
        ...state, 
        taskList: state.taskList.map(
          task => task.id === payload ? {...task, isEditable: true} : task
        )
     }
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: payload
      }
    case FETCH_SPECIFICALLY_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        taskList: payload
      }
    case FETCH_ADDING_TASK_SUCCESS:
      return {
        ...state,
        taskList: [...state.taskList, payload]
      }
    case FETCH_FINISH_EDITING_TASK_REQUEST:
      return {
        ...state
      }
    case FETCH_FINISH_EDITING_TASK_SUCCESS:
      return {
        ...state,
        taskList: state.taskList.map(
          task => task.id === payload.id ? {...task, todo: payload.value, isEditable: false} : task
        )
      }
    case FETCH_FINISH_EDITING_TASK_FAILURE:
      return {
        ...state,
        error: payload
      }
    case FETCH_DELETING_TASK_REQUEST:
      return {
        ...state
      }
    case FETCH_DELETING_TASK_SUCCESS:
      const newArray = state.taskList.filter(item => item.id !== payload)
      return {
        ...state, 
        taskList: newArray
      }
    case FETCH_DELETING_TASK_FAILURE:
      return {
        ...state,
        error: payload
      }
    case FETCH_DONE_TASK_REQUEST:
      return {
        ...state,
      }
    case FETCH_DONE_TASK_SUCCESS:
      return {
        ...state,
        taskList: state.taskList.map(
          task => task.id === payload ? {...task, isDone: !task.isDone} : task
        )
      }
    case FETCH_DONE_TASK_FAILURE:
      return {
        ...state,
        error: payload
      }
    default: return state
  }
}

export default taskReducer;
