import { dbRef } from '../../components/Firebase/firebase'; 
import { FETCH_TASKS_REQUEST, FETCH_TASKS_FAILURE, 
         FETCH_TASKS_SUCCESS, FETCH_ADDING_TASK_REQUEST, 
         FETCH_ADDING_TASK_SUCCESS, FETCH_ADDING_TASK_FAILURE,
         FETCH_FINISH_EDITING_TASK_REQUEST, FETCH_FINISH_EDITING_TASK_SUCCESS,
         FETCH_FINISH_EDITING_TASK_FAILURE, FETCH_DELETING_TASK_SUCCESS,
         FETCH_DELETING_TASK_REQUEST, FETCH_DELETING_TASK_FAILURE,
         FETCH_DONE_TASK_REQUEST, FETCH_DONE_TASK_SUCCESS,
         FETCH_DONE_TASK_FAILURE } from '../types';

// Get
const fetchTasksRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST
  }
}

const fetchTasksSuccess  = payload => {
  return {
    type: FETCH_TASKS_SUCCESS,
    payload
  }
}

const fetchTasksFailure = payload => {
  return {
    type: FETCH_TASKS_FAILURE,
    payload
  }
}
// Add
const fetchAddingTaskRequest = () => {
  return {type: FETCH_ADDING_TASK_REQUEST}
}

const fetchAddingTaskSuccess = payload => {
  return {
    type: FETCH_ADDING_TASK_SUCCESS,
    payload
  }
}

const fetchAddingTaskFailure = payload => {
  return {
    type: FETCH_ADDING_TASK_FAILURE,
    payload
  }
}
// Edit
const fetchFinishEditingTaskRequest = () => {
  return {type: FETCH_FINISH_EDITING_TASK_REQUEST}
}

const fetchFinishEditingTaskSuccess = payload => {
  return {
    type: FETCH_FINISH_EDITING_TASK_SUCCESS,
    payload
  }
}

const fetchFinishEditingTaskFailure = payload => {
  return {
    type: FETCH_FINISH_EDITING_TASK_FAILURE,
    payload
  }
}
// Delete
const fetchDeletingTaskRequest = () => {
  return {type: FETCH_DELETING_TASK_REQUEST}
}

const fetchDeletingTaskSuccess = payload => {
  return {
    type: FETCH_DELETING_TASK_SUCCESS,
    payload
  }
}

const fetchDeletingTaskFailure = payload => {
  return {
    type: FETCH_DELETING_TASK_FAILURE,
    payload
  }
}
// Done
const fetchDoneTaskRequest = () => {
  return {type: FETCH_DONE_TASK_REQUEST}
}

const fetchDoneTaskSuccess = payload => {
  return {
    type: FETCH_DONE_TASK_SUCCESS,
    payload
  }
}

const fetchDoneTaskFailure = payload => {
  return {
    type: FETCH_DONE_TASK_FAILURE,
    payload
  }
}

export const fetchTasks = () => {
  return async dispatch => {
    try {
    await dispatch(fetchTasksRequest());
    const response = await dbRef.get()
    const result = [];
    await response.forEach(doc => result.push({...doc.data(), id: doc.id}));
    await dispatch(fetchTasksSuccess(result));
  } catch {
    await dispatch(fetchTasksFailure(new Error('Error in fetch tasks')));
  }
  }
}

export const fetchAddingTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchAddingTaskRequest());
      const response = await dbRef.add({ todo: payload.todo, description: payload.description, isEditable: false, isDone: false });
      await dbRef.doc(response.id).update({ id: response.id });
      await dispatch(fetchAddingTaskSuccess({ id: response.id, todo: payload.todo, description: payload.description, isEditable: false, isDone: false }))
    } catch {
      await dispatch(fetchAddingTaskFailure(new Error('Error in fetch adding task')));
    }
  }
}

export const fetchFinishEditingTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchFinishEditingTaskRequest());
      await dbRef.doc(payload.id).update({todo: payload.value, isEditable: false});
      await dispatch(fetchFinishEditingTaskSuccess({id: payload.id, value: payload.value}));
    } catch {
      fetchFinishEditingTaskFailure(new Error('smth goes wrong'));
    }
  }
}

export const fetchDeletingTask = payload => {
  return async dispatch => {
    try {
    await dispatch(fetchDeletingTaskRequest());
    await dbRef.doc(payload).delete();
    await dispatch(fetchDeletingTaskSuccess(payload));
    } catch {
      dispatch(fetchDeletingTaskFailure(new Error('Error in fetch deleting task')))
    }
  }
}

export const fetchDoneTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchDoneTaskRequest());
      await dbRef.doc(payload.id).update({id: payload.id, isDone: !payload.isDone});
      await dispatch(fetchDoneTaskSuccess(payload.id));
    } catch {
      await dispatch(fetchDoneTaskFailure(new Error('Error in fetch done task')));
    }
  }
}
