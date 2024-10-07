import React from 'react';
import classes from './Wall.module.scss';
import { Post } from '../../components/Post/Post.jsx';
import { MyInput } from '../../components/UI/input/MyInput.jsx';
import { useInput } from '../../hooks/useInput.jsx';
import { MySelect } from '../../components/UI/select/MySelect.jsx';
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
import { v1 } from 'uuid';
import { useSorted } from '../../hooks/useSorted.jsx';
import { useDeletePost } from '../../hooks/useDeletePost.jsx';

export function Wall(props) {
  const { postsLists, setPostsLists } = props;

  const searchInput = useInput();
  const sortedPosts = useSorted(postsLists, setPostsLists);
  const deletedPosts = useDeletePost(postsLists, setPostsLists);

  searchInput.onChangeInput = (event) => {
    searchInput.setValue(event.target.value);
  };

  return (
    <>
      <div className={classes.full_wall}>
        <MyInput
          value={searchInput.value}
          onChange={searchInput.onChangeInput}
          placeholder="Поиск..."
        />
        <hr style={{ margin: '15px 0' }} />
        <MySelect
          value={sortedPosts.selectedSort}
          onChange={sortedPosts.sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
        <div className={classes.wall_post}>
          <TransitionGroup>
            {postsLists.length !== 0 ? (
              postsLists
                .filter((postText) => postText.title.toLowerCase().includes(searchInput.value))
                .map((post) => (
                  <CSSTransition key={post.description} timeout={300} classNames="post">
                    <Post
                      post={post}
                      onClick={deletedPosts.onDeleteClickMyButton}
                      setPostsLists={setPostsLists}
                      postsLists={postsLists}
                    />
                  </CSSTransition>
                ))
            ) : (
              <CSSTransition key={v1()} timeout={500} classNames="clearPage">
                <h2>Добавьте хоть что-то, пустая страница - скучное явление</h2>
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}
