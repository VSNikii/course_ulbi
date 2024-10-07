import {useState} from 'react';
import { MyButton } from '../UI/button/MyButton.jsx';
import React from 'react';
import { useInput } from '../../hooks/useInput.jsx';
import { MyInput } from '../UI/input/MyInput.jsx';
import { v1 } from 'uuid';
import classes from './addPost.module.scss'

export function AddPost(props) {
  const { setPostsLists, setVisible } = props;

  const [error, setError] = useState(null);

  const inputTitle = useInput();
  const inputDescription = useInput();

  const addNewPost = () => {
    // проверка на пустой инпут
    if (inputTitle.value.trim() || inputDescription.value.trim()) {
      setError(false);
      // добавлениие в массив постлистов
      const postsObj = { title: inputTitle.value, description: inputDescription.value, id: v1() };
      setPostsLists((prev) => [...prev, postsObj]);
    } else {
      setError(true);
    }

    

    // Очищение инпута
    inputTitle.setValue('');
    inputDescription.setValue('');
    setVisible(prev => !prev);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <MyInput
          type="text"
          value={inputTitle.value}
          onChange={inputTitle.onChangeInput}
          placeholder="Название поста"
          error={error}
        />
        <MyInput
          type="text"
          value={inputDescription.value}
          onChange={inputDescription.onChangeInput}
          placeholder="Описание поста"
          error={error}
        />

        <MyButton onClick={addNewPost}>Добавить пост</MyButton>
      </div>
    </>
  );
}
// valueTitle valueDescription onChangeInputAddTitlePost onChangeInputAddDescriptionPost
