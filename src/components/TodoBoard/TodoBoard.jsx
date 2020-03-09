import React, { useState, useEffect } from 'react';
import s from './TodoBoard.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './TodoList/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, addTask, editTask, removeTask, confirmEditTask, doneTask, toggleIsFetching } from '../../redux/actions/index';
import { dbRef } from '../Firebase/firebase';
import Tabs from '../Tabs/Tabs';

toast.configure({ autoClose: false });

export const TodoBoard = () => {
  const isFetching = useSelector(state => state.todos.isFetching);
  const [inputTaskValue, setInputTaskValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const notify = () => toast.error("A Field Should Be Filled");


  const handleAddingTask = () => {
    if(inputTaskValue !== '') {
      dbRef.add({ todo: inputTaskValue, isEditable: false, isDone: false, description: descriptionValue })
        .then(ref => {
          dbRef.doc(ref.id).update({ id: ref.id });
          dispatch(addTask({ id: ref.id, todo: inputTaskValue, isEditable: false, isDone: false, description: descriptionValue }))
        })
      setInputTaskValue('');
      setDescriptionValue('');
    } else {
      notify();
    }
  }
  const handleEditingTaskMessage = id => dispatch(editTask(id));

  const handleFinishEditingTask = ({id, value}) => {
    dbRef.doc(id).update({
      todo: value, isEditable: false
    })
    .then(() => dispatch(confirmEditTask({id, value})))
  }
  const handleDeletingTask = id => {
    dbRef.doc(id).delete()
      .then(() => dispatch(removeTask(id)))
  }
  const handleDoneTask = (id, isCompleted) => {
        dbRef.doc(id).update({id, isDone: !isCompleted })
          .then(() => dispatch(doneTask(id)))
          .catch(err => console.log(err));
  }
  const getCompletedTasks = todos => {
    let completedTask = todos.filter(item => !item.isDone);
    setCount(completedTask.length);
  }

  useEffect(() => {
    dbRef.get()
    .then(snap => {
      const result = [];
      snap.forEach(doc => result.push({...doc.data(), id: doc.id}))
      dispatch(getTasks(result));
      dispatch(toggleIsFetching());
    })
    .catch(err => console.log(err));
  }, [dispatch])


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
        />
        <Button
          onClick={handleAddingTask}
          color="primary"
          variant="contained">
          Add Task
        </Button>
      </div>
      <TextField
        className={s.descriptionInput}
        onChange={e => setDescriptionValue(e.target.value)}
        variant="outlined"
        label="Type your description"
        value={descriptionValue}
      />
      <div className={s.todoFilter}>
        <Tabs />
      </div>
        <TodoList
          isFetching={isFetching}
          getCompletedTasks={getCompletedTasks}
          editTaskMessage={handleEditingTaskMessage}
          finishEditingTask={handleFinishEditingTask}
          deleteTask={handleDeletingTask}
          handleDoneTask={handleDoneTask}
        />
      <div className={s.todoCounter}>
        <p className={s.counter}>{count <= 1 ? `${count} todo left` : `${count} todos left`}</p>
      </div>
    </div>
  )
}

export default TodoBoard;
