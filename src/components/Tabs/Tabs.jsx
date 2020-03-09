import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import { showActiveTasks, showCompletedTasks, getTasks } from '../../redux/actions/index';
import { dbRef } from '../Firebase/firebase';
import './Tabs.css';

function TabPanel({ children, value, index, ...other }) {

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'space-between'
  },
}));

export default function SimpleTabs() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getActiveTasks = () => {
    dbRef.where('isDone', '==', false).get()
      .then(snap => {
        const result = [];
        snap.forEach(doc => result.push({...doc.data()}))
        dispatch(showActiveTasks(result));
      })
      .catch(err => console.log(err));
  }
  const getCompletedTasks = () => {
    dbRef.where('isDone', '==', true).get()
      .then(snap => {
        const result = [];
        snap.forEach(doc => result.push({...doc.data()}))
        dispatch(showCompletedTasks(result));
      })
      .catch(err => console.log(err));
  }
  const getAllTasks = () => {
    dbRef.get()
      .then(snap => {
        const result = [];
        snap.forEach(doc => result.push({...doc.data()}))
        dispatch(getTasks(result));
      })
      .catch(err => console.log(err));
  }

  return (
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab onClick={() => getAllTasks()} label="All" {...a11yProps(0)} />
        <Tab onClick={() => getCompletedTasks()} label="Completed" {...a11yProps(1)} />
        <Tab onClick={() => getActiveTasks()} label="Active" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
  );
}