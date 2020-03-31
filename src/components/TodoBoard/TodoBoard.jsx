import React, { useEffect, useState } from 'react';
import s from './TodoBoard.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { editTask } from '../../redux/actions/index';
import { fetchAddingTask, fetchFinishEditingTask, fetchDeletingTask, fetchDoneTask } from '../../redux/actions/asyncTaskActions';
import Select from '../Select/Select';

toast.configure({ autoClose: false });

export const TodoBoard = (({ darkMode }) => {
  const [inputTaskValue, setInputTaskValue] = useState('');
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.todos.loading);
  const notify = () => toast.error("A Field Should Be Filled");
  console.log('[TodoBoard]')
   
  const todos  = useSelector(
    state => {
      if (state.todos.activeType === null) {
        return state.todos.taskList;
      } else {
        if (state.todos.activeType) {
          return state.todos.taskList.filter(i => i.isDone);
        } else {
          return state.todos.taskList.filter(i => !i.isDone);
        }
      }
  });

  const handleAddingTask = () => {
    if(inputTaskValue !== '') {
      dispatch(fetchAddingTask(inputTaskValue));
      setInputTaskValue('');
    } else {
      notify();
    }
  }

  const getCompletedTasks = todos => {
    let finishedTask = todos.filter(item => !item.isDone);
    setCount(finishedTask.length);
  }

  useEffect(() => {
    getCompletedTasks(todos);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditingTaskMessage = id => dispatch(editTask(id));

  const handleFinishEditingTask = ({id, value}) => dispatch(fetchFinishEditingTask({id, value}));

  const handleDeletingTask = id => dispatch(fetchDeletingTask(id));

  const handleDoneTask = ({id, isDone}) => dispatch(fetchDoneTask({id, isDone}));

  return (
    <div className={s.todoBoard}>
      <div className={s.boardWrapper}>
        <TextField
          className={s.taskInpt}
          onChange={e => setInputTaskValue(e.target.value)}
          id="outlined-basic"
          label="Type your task"
          value={inputTaskValue}
          variant="outlined"
          onKeyPress={event => {
            if(event.key === "Enter") {
              handleAddingTask();
            }
          }}
        />
        <Button
          onClick={handleAddingTask}
          color="primary"
          variant="contained">
          Add Task
        </Button>
      </div>
      <div className={s.todoFilter}>
        <Select />
      </div>
        <TodoList
          darkMode={darkMode}
          loading={loading}
          todos={todos}
          editTaskMessage={handleEditingTaskMessage}
          finishEditingTask={handleFinishEditingTask}
          deleteTask={handleDeletingTask}
          handleDoneTask={handleDoneTask}
        />
      <div className={darkMode ? s['dark-mode-todoCounter'] : s.todoCounter}>
        <p className={s.counter}>{count <= 1 ? `${count} todo left` : `${count} todos left`}</p>
      </div>
    </div>
  )
});

export default TodoBoard;
