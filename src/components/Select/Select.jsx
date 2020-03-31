import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificallyTasks } from '../../redux/actions/asyncFilterActions';

const options = [
  {
    value: {
      id: 1,
      cond: null,
    },
    label: 'All'
  
  },
  {
    value: {
      id: 2,
      cond: false,
      condition: ['isDone', '==', false]
    },
    label: 'Active'
  
  },
  {
    value: {
      id: 3,
      cond: true,
      condition: ['isDone', '==', true]
    },
    label: 'Completed'
  
  },
];

const MenuItems = options.map(item => <MenuItem key={item.label} name='lol' value={item.value}>{item.label}</MenuItem>)

const useStyles = makeStyles(theme => ({
  formControl: {minWidth: 120 },
  selectEmpty: { marginTop: theme.spacing(2) }
}));

export default function SimpleSelect() {
  const selector = useSelector(state => {
    return options.find(item => item.value.cond === state.todos.activeType).value;
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const [item, setItem] = useState(options[1].value);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);


  useEffect(() => {
    dispatch(fetchSpecificallyTasks());
    setLabelWidth(inputLabel.current.offsetWidth);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Filter
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selector}
        onChange={e => {
          dispatch({ type: 'CHANGE_TODO_ACTIVE_TYPE', payload: e.target.value.cond })
          setItem(e.target.value)
        }}
        labelWidth={labelWidth}
      >
        {MenuItems}
      </Select>
    </FormControl>
  )
}