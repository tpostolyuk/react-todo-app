import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../redux/actions/asyncTaskActions';
import { fetchSpecificallyTasks } from '../../redux/actions/asyncFilterActions';

const options = [
  {value: 1, label: 'All'},
  {value: 2, label: 'Active'},
  {value: 3, label: 'Completed'}
]
const MenuItems = options.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)

const useStyles = makeStyles(theme => ({
  formControl: {minWidth: 120 },
  selectEmpty: { marginTop: theme.spacing(2) }
}));

export default function SimpleSelect() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [item, setItem] = useState(1);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = event => {
    debugger;
    console.log(item)
    setItem(event.target.value);
    console.log(item);
  };

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
        Filter
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={item}
        onChange={handleChange}
        labelWidth={labelWidth}
      >
        {MenuItems}
      </Select>
    </FormControl>
  )
}