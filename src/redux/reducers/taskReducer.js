import { GET_TASKS, ADD_TASK, EDIT_TASK, REMOVE_TASK, CONFIRM_EDIT_TASK, DONE_TASK, SHOW_COMPLETED_TASKS, SHOW_ACTIVE_TASKS, TOGGLE_ISFETCHING } from '../types';

const initState = {
  taskList: [],
  isFetching: true
};

const taskReducer = (state = initState, action) => {
  const { payload } = action;
  switch(action.type) {
    case GET_TASKS:
      return {
        ...state,
        taskList: payload
      }
    case ADD_TASK: 
      return {
        ...state, 
        taskList: [...state.taskList, payload ]
      };
    case REMOVE_TASK:
      const newArray = state.taskList.filter(item => item.id !== payload)
      return {
        ...state, 
        taskList: newArray
      }
    case EDIT_TASK:
      return { 
        ...state, 
        taskList: state.taskList.map(
          task => task.id === payload ? {...task, isEditable: true} : task
        )
     }
     case CONFIRM_EDIT_TASK:
      return {
        ...state,
        taskList: state.taskList.map(
           task => task.id === payload.id ? {...task, todo: payload.value, isEditable: false} : task
         )
       }
    case DONE_TASK:
      return {
       ...state,
        taskList: state.taskList.map(
          task => task.id === payload ? {...task, isDone: !task.isDone} : task
        )
      }
    case SHOW_COMPLETED_TASKS:
      return {
        ...state,
        taskList: payload
      }
    case SHOW_ACTIVE_TASKS:
      return {
        ...state,
        taskList: payload
      }
    case TOGGLE_ISFETCHING:
      return {
        ...state,
        isFetching: !state.isFetching

      }
    default: return state
  }
}

export default taskReducer;
