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
  return dispatch => {
    dispatch(fetchTasksRequest());
    dbRef.get()
      .then(snap => {
        const result = [];
        snap.forEach(doc => result.push({...doc.data(), id: doc.id}))
        dispatch(fetchTasksSuccess(result));
      })
      .catch(e => dispatch(fetchTasksFailure(e.message)));
  }
}

export const fetchAddingTask = payload => {
  return dispatch => {
    dispatch(fetchAddingTaskRequest());
    dbRef.add({ todo: payload, isEditable: false, isDone: false })
      .then(ref => {
        dbRef.doc(ref.id).update({ id: ref.id })
        dispatch(fetchAddingTaskSuccess({ id: ref.id, todo: payload, isEditable: false, isDone: false }))
      })
      .catch(e => dispatch(fetchAddingTaskFailure(e.message)));
  }
}

export const fetchFinishEditingTask = payload => {
  return dispatch => {
    dispatch(fetchFinishEditingTaskRequest());
    dbRef.doc(payload.id).update({todo: payload.value, isEditable: false})
    .then(() => dispatch(fetchFinishEditingTaskSuccess({id: payload.id, value: payload.value})))
    .catch(e => fetchFinishEditingTaskFailure(e.message))
  }
}

export const fetchDeletingTask = payload => {
  return dispatch => {
    dispatch(fetchDeletingTaskRequest());
    dbRef.doc(payload).delete()
      .then(() => dispatch(fetchDeletingTaskSuccess(payload)))
      .catch(e => dispatch(fetchDeletingTaskFailure(e.message))); 
  }
}

export const fetchDoneTask = payload => {
  return dispatch => {
    dispatch(fetchDoneTaskRequest());
    dbRef.doc(payload.id).update({id: payload.id, isDone: !payload.isDone})
          .then(() => dispatch(fetchDoneTaskSuccess(payload.id)))
          .catch(e => dispatch(fetchDoneTaskFailure(e.message)));
  }
}
