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
const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST });

const fetchTasksSuccess = payload => ({ 
  type: FETCH_TASKS_SUCCESS, 
  payload 
});

const fetchTasksFailure = payload => ({ 
  type: FETCH_TASKS_FAILURE, 
  payload 
});
// Add
const fetchAddingTaskRequest = () => ({ type: FETCH_ADDING_TASK_REQUEST });

const fetchAddingTaskSuccess = payload => ({ 
  type: FETCH_ADDING_TASK_SUCCESS, 
  payload 
});

const fetchAddingTaskFailure = payload => ({ 
  type: FETCH_ADDING_TASK_FAILURE, 
  payload 
});
// Edit
const fetchFinishEditingTaskRequest = () => ({ type: FETCH_FINISH_EDITING_TASK_REQUEST });

const fetchFinishEditingTaskSuccess = payload => ({ 
  type: FETCH_FINISH_EDITING_TASK_SUCCESS, 
  payload 
});

const fetchFinishEditingTaskFailure = payload => ({
  type: FETCH_FINISH_EDITING_TASK_FAILURE,
  payload
})
// Delete
const fetchDeletingTaskRequest = () => ({ type: FETCH_DELETING_TASK_REQUEST });

const fetchDeletingTaskSuccess = payload => ({
  type: FETCH_DELETING_TASK_SUCCESS,
  payload
})

const fetchDeletingTaskFailure = payload => {
  return {
    type: FETCH_DELETING_TASK_FAILURE,
    payload
  }
}
// Done
const fetchDoneTaskRequest = () => ({ type: FETCH_DONE_TASK_REQUEST });

const fetchDoneTaskSuccess = payload => ({
  type: FETCH_DONE_TASK_SUCCESS,
  payload
})

const fetchDoneTaskFailure = payload => ({
  type: FETCH_DONE_TASK_FAILURE,
  payload
})

export const fetchTasks = () => {
  return async dispatch => {
    try {
    await dispatch(fetchTasksRequest());
    const response = await dbRef.get()
    const result = [];
    await response.forEach(doc => result.push({...doc.data(), id: doc.id}));
    await dispatch(fetchTasksSuccess(result));
  } catch(error) {
    await dispatch(fetchTasksFailure(new Error(error)));
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
    } catch(error) {
      await dispatch(fetchAddingTaskFailure(new Error(error)));
    }
  }
}

export const fetchFinishEditingTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchFinishEditingTaskRequest());
      await dbRef.doc(payload.id).update({todo: payload.value, isEditable: false});
      await dispatch(fetchFinishEditingTaskSuccess({id: payload.id, value: payload.value}));
    } catch(error) {
      fetchFinishEditingTaskFailure(new Error(error));
    }
  }
}

export const fetchDeletingTask = payload => {
  return async dispatch => {
    try {
    await dispatch(fetchDeletingTaskRequest());
    await dbRef.doc(payload).delete();
    await dispatch(fetchDeletingTaskSuccess(payload));
    } catch(error) {
      dispatch(fetchDeletingTaskFailure(new Error(error)))
    }
  }
}

export const fetchDoneTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchDoneTaskRequest());
      await dbRef.doc(payload.id).update({id: payload.id, isDone: !payload.isDone});
      await dispatch(fetchDoneTaskSuccess(payload.id));
    } catch(error) {
      await dispatch(fetchDoneTaskFailure(new Error(error)));
    }
  }
}
