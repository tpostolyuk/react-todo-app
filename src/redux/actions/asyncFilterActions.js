import { dbRef } from '../../components/Firebase/firebase'
import { FETCH_FAILURE, FETCH_TASKS_REQUEST, FETCH_SPECIFICALLY_TASKS_SUCCESS} from '../types'

const fetchFailure = payload => ({
  type: FETCH_FAILURE,
  payload
})

const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST })

const fetchSpecificallyTasksSuccess = payload => ({
  type: FETCH_SPECIFICALLY_TASKS_SUCCESS, 
  payload
})

export const fetchSpecificallyTasks = (condition = []) => {
  const db = condition.length ? dbRef.where(...condition) : dbRef
  return async dispatch => {
    try {
      await dispatch(fetchTasksRequest())
      const result = []
      const snap = await db.get()
      await snap.forEach(doc => result.push({ ...doc.data() }))
      await dispatch(fetchSpecificallyTasksSuccess(result))
    }
    catch(error) {
      dispatch(fetchFailure(new Error(error)))
    }
  }
}
