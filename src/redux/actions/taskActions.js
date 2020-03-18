import { EDIT_TASK } from '../types';

export const editTask = payload => {
  return {
    type: EDIT_TASK,
    payload
  }
}


