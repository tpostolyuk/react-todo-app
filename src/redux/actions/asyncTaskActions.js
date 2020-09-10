import * as actions from '../types'
import { dbRef } from '../../components/Firebase' 

// Get
const fetchTasksRequest = () => ({ type: actions.FETCH_TASKS_REQUEST })

const fetchTasksSuccess = payload => ({ 
  type: actions.FETCH_TASKS_SUCCESS, 
  payload 
})

const fetchTasksFailure = payload => ({ 
  type: actions.FETCH_TASKS_FAILURE, 
  payload 
})
// Add
const fetchAddingTaskRequest = () => ({ type: actions.FETCH_ADDING_TASK_REQUEST })

const fetchAddingTaskSuccess = payload => ({ 
  type: actions.FETCH_ADDING_TASK_SUCCESS, 
  payload 
})

const fetchAddingTaskFailure = payload => ({ 
  type: actions.FETCH_ADDING_TASK_FAILURE, 
  payload 
})
// Edit
const fetchFinishEditingTaskRequest = () => ({ type: actions.FETCH_FINISH_EDITING_TASK_REQUEST })

const fetchFinishEditingTaskSuccess = payload => ({ 
  type: actions.FETCH_FINISH_EDITING_TASK_SUCCESS, 
  payload 
})

const fetchFinishEditingTaskFailure = payload => ({
  type: actions.FETCH_FINISH_EDITING_TASK_FAILURE,
  payload
})
// Delete
const fetchDeletingTaskRequest = () => ({ type: actions.FETCH_DELETING_TASK_REQUEST })

const fetchDeletingTaskSuccess = payload => ({
  type: actions.FETCH_DELETING_TASK_SUCCESS,
  payload
})

const fetchDeletingTaskFailure = payload => {
  return {
    type: actions.FETCH_DELETING_TASK_FAILURE,
    payload
  }
}
// Done
const fetchDoneTaskRequest = () => ({ type: actions.FETCH_DONE_TASK_REQUEST })

const fetchDoneTaskSuccess = payload => ({
  type: actions.FETCH_DONE_TASK_SUCCESS,
  payload
})

const fetchDoneTaskFailure = payload => ({
  type: actions.FETCH_DONE_TASK_FAILURE,
  payload
})

export const fetchTasks = () => {
  return async dispatch => {
    try {
    await dispatch(fetchTasksRequest())
    const response = await dbRef.get()
    const result = []
    response.forEach(doc => result.push({...doc.data(), id: doc.id}))
    await dispatch(fetchTasksSuccess(result))
  } catch(error) {
    await dispatch(fetchTasksFailure(new Error(error)))
  }
  }
}

export const fetchAddingTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchAddingTaskRequest())
      const response = await dbRef.add({ todo: payload.todo, description: payload.description, isEditable: false, isDone: false })
      await dbRef.doc(response.id).update({ id: response.id })
      await dispatch(fetchAddingTaskSuccess({ id: response.id, todo: payload.todo, description: payload.description, isEditable: false, isDone: false }))
    } catch(error) {
      await dispatch(fetchAddingTaskFailure(new Error(error)))
    }
  }
}

export const fetchFinishEditingTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchFinishEditingTaskRequest())
      await dbRef.doc(payload.id).update({todo: payload.value, isEditable: false})
      await dispatch(fetchFinishEditingTaskSuccess({id: payload.id, value: payload.value}))
    } catch(error) {
      fetchFinishEditingTaskFailure(new Error(error))
    }
  }
}

export const fetchDeletingTask = payload => {
  return async dispatch => {
    try {
    await dispatch(fetchDeletingTaskRequest())
    await dbRef.doc(payload).delete()
    await dispatch(fetchDeletingTaskSuccess(payload))
    } catch(error) {
      dispatch(fetchDeletingTaskFailure(new Error(error)))
    }
  }
}

export const fetchDoneTask = payload => {
  return async dispatch => {
    try {
      await dispatch(fetchDoneTaskRequest())
      await dbRef.doc(payload.id).update({id: payload.id, isDone: !payload.isDone})
      await dispatch(fetchDoneTaskSuccess(payload.id))
    } catch(error) {
      await dispatch(fetchDoneTaskFailure(new Error(error)))
    }
  }
}
