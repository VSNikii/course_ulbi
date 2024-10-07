import React from 'react';
import classes from './post.module.scss';
import { MyButton } from '../UI/button/MyButton';
import { useState } from 'react';
import { MyInput } from '../UI/input/MyInput';
import { useNavigate } from 'react-router';

export function Post(props) {
  const { post, onClick } = props;

  const router = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [valueTitle, setValueTitle] = useState(post.title);
  const [valueDescription, setValueDescription] = useState(post.body);

  const onClickEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const onChangeInputTitle = (event) => {
    post.title = valueTitle;    
    setValueTitle(event.target.value);
  };


  const onChangeInputDescription = (event) => {
    post.body = valueDescription;
    setValueDescription(event.target.value);
  };

  return (
    <>
      <div className={classes.postBlock}>
        <img width={32} height={32} src="/editPosts.png" alt="edit" onClick={onClickEditMode} />
        {editMode ? (
          <>
            <MyInput value={valueTitle} onChange={onChangeInputTitle} onBlur={() => setEditMode(false)}/> <br />
            <MyInput value={valueDescription} onChange={onChangeInputDescription} onBlur={() => setEditMode(false)} />
          </>
        ) : (
          <>
            <h2 className={classes.title}>{post.title}</h2>
            <p className={classes.description}>{post.body}</p>
          </>
         )}
        <pre className={classes.author}>{post.author}</pre>
        <MyButton onClick={() => {router(`/posts/${post.id}`)}}>Открыть</MyButton>
        <MyButton onClick={() => onClick(post.id)}>Удалить</MyButton>
      </div>
    </>
  );
}