import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classes from './Auth.module.css';
import { auth } from '../Firebase/firebase';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    e.preventDefault();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
  }

  const signUp = e => {
    e.preventDefault();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then(user => console.log(user))
      .catch(e => console.log(e.message, e.status)); 
  }

  return (
    <div className={classes.auth}>
      <form className={classes.signUpForm}>
        <TextField 
          required 
          className={classes.formItem}
          id="standard-required1" 
          label="Email"
          onChange={e => setEmail(e.target.value )}
        />
        <TextField
          required
          className={classes.formItem}
          id="standard-required2"
          label="Password"
          onChange={e => setPassword(e.target.value)}
        />
          <Button
            className={classes.formItem} 
            variant="contained"
            color="default" 
            type="submit"
            onClick={e => signIn(e)}
            >Sign In
          </Button>
        <Button
          className={classes.formItem}
          variant="contained"
          color="primary"
          type="submit"
          onClick={e => signUp(e)}>
          Sign Up            
        </Button>
      </form>
    </div>
  )
}

export default Auth; 
