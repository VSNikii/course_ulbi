import React from 'react';
import classes from './MyInput.module.scss';

export const MyInput = (props) => {
  return (
    <>
      <input className={props.error ? classes.error : classes.MyInput} {...props} />
      {props.error && <pre className={classes.error_text}>Полe не может быть пустым!</pre>}
    </>
  );
};
