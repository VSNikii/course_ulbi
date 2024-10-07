import React from 'react';
import classes from './MyButton.module.scss';



export function MyButton({children, ...props}) {
  
  return (
    <>
      <button className={classes.customButton} {...props}>{children}</button>
    </>
  );
}

