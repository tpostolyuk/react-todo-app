import { dbRef } from '../../components/Firebase/firebase';
import { FETCH_FAILURE, FETCH_TASKS_REQUEST,
         FETCH_SPECIFICALLY_TASKS_SUCCESS} from '../types';

const fetchFailure = payload => {
  return {
    type: FETCH_FAILURE,
    payload
  }
}

const fetchTaskRequest = () => {
  return {
    type: FETCH_TASKS_REQUEST
  }
}

const fetchSpecificallyTasksSuccess = payload => {
  return {
    type: FETCH_SPECIFICALLY_TASKS_SUCCESS,
    payload
  }
}

export const fetchSpecificallyTasks = (bool) => {
  return dispatch => {
    dispatch(fetchTaskRequest());
    dbRef.where('isDone', '==', bool).get()
      .then(snap => {
        const result = [];
        snap.forEach(doc => result.push({...doc.data()}))
        dispatch(fetchSpecificallyTasksSuccess(result));
      })
      .catch(e => dispatch(fetchFailure(e.message)));
  }
}
