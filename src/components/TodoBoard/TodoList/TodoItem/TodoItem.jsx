import React from 'react';
import { useState } from 'react';
import s from './TodoItem.module.scss';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

const TodoItem = ({isDone, isEditable, id, taskMessage, handleDoneTask, deleteTask, editTaskMessage, finishEditingTask}) => {
  const [newInputValue, setNewInputValue] = useState('');

  function renderIfDefault() {
    return (
      <React.Fragment>
        <div className={s.leftPart}>
          <Checkbox
            checked={isDone}
            onChange={() => handleDoneTask(id, isDone)}
            value="secondary"
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <div className={s.taskTextContainer}>
            <p className={`${s.taskMessage} ${isDone ? s.done : ''}`}>{taskMessage}</p>
          </div>
        </div>
        <div className={s.taskActionContainer}>
          <span
            className={s.taskDeleteIcon}
            onClick={() => deleteTask(id)}>
            &#10006;
          </span>
          <span onClick={() => editTaskMessage(id)}>EDIT</span>
        </div>
      </React.Fragment>
    )
  }

  function renderIfEditable() {
    return (
      <React.Fragment>
        <div className={s.editTaskInput}>
        <TextField
          onChange={e => setNewInputValue(e.target.value)}
          id="standard-basic"
          label="Edit task..." />
        </div>
        <div className={s.taskActionContainer}>
          <span onClick={() => deleteTask(id)}>&#10006;</span>
          <span onClick={() => finishEditingTask({id: id, value: newInputValue})}>&#10003;</span>
        </div>
      </React.Fragment>
    )
  }

  return (
      !isEditable ? (
        <div className={s.taskItemContainer}>
          {renderIfDefault()}
        </div>)
      : (
        <div className={s.taskItemContainer}>
          {renderIfEditable()}
        </div>)
  )
}

TodoItem.propTypes = {
  isDone: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  taskMessage: PropTypes.string.isRequired,
  finishEditingTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleDoneTask: PropTypes.func.isRequired,
}


export default TodoItem;