import { dbRef } from '../../components/Firebase/firebase';
import { FETCH_FAILURE, FETCH_TASKS_REQUEST,
         FETCH_SPECIFICALLY_TASKS_SUCCESS} from '../types';

const fetchFailure = payload => {
  return {
    type: FETCH_FAILURE,
    payload
  }
}

const fetchTasksRequest = () => {
  return {type: FETCH_TASKS_REQUEST}
}

const fetchSpecificallyTasksSuccess = payload => {
  return {
    type: FETCH_SPECIFICALLY_TASKS_SUCCESS,
    payload
  }
}

export const fetchSpecificallyTasks = (condition = []) => {
  const db = condition.length ? dbRef.where(...condition) : dbRef;
  return dispatch => {
    dispatch(fetchTasksRequest());
    db.get()
      .then(snap => {
        const result = [];
        snap.forEach(doc => result.push({...doc.data()}))
        dispatch(fetchSpecificallyTasksSuccess(result));
      })
      .catch(e => dispatch(fetchFailure(e.message)));
  }
}
