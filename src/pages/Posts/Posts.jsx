import { AddPost } from '../../components/AddPost/AddPost.jsx';
import { Wall } from '../Wall/Wall.jsx';
import { useState, useEffect } from 'react';
import { MyModal } from '../../components/UI/modal/MyModal.jsx';
import { MyButton } from '../../components/UI/button/MyButton.jsx';
import { useSorted } from './../../hooks/useSorted.jsx';
import PostService from './../../API/PostService.js'
import { Loader } from '../../components/UI/loader/Loader.jsx';
import { getPageCount } from '../../utils/pages.js';
import { Pagination } from '../../components/UI/Pagination/Pagination.jsx';
import {useFetching} from './../../hooks/useFetching.jsx';

export function Posts() {
  const [postsLists, setPostsLists] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const filterAsDep = useSorted();

  //Запрос на сервер для получения постов
  const [fetching, isLoading, error] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPostsLists(response.data);
    // реализация пагинации
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });
  // Отслеживание данных для запроса
  useEffect(() => {
    fetching();
  }, [filterAsDep.selectedSort, page]);

  // Обработчик переключения страниц
  const onClickPagination = (p) => {
    setPage(p);
    setLimit(prev => prev);
  };
  // Обработчик для открытий модального окна
  const onClickVisibleModal = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Блог</h1>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Loader />
        </div>
      ) : !error ? (
        <Wall postsLists={postsLists} setPostsLists={setPostsLists} />
      ) : (
        <div>
          <h1 style={{ color: 'red' }}>Произошла ошибка: {error}</h1>
        </div>
      )}
      {visible && (
        <MyModal setVisible={setVisible} visible={visible}>
          <AddPost setPostsLists={setPostsLists} postsLists={postsLists} setVisible={setVisible} />
        </MyModal>
      )}
      <Pagination onClickPagination={onClickPagination} page={page} totalPages={totalPages} />
      <MyButton onClick={onClickVisibleModal}>Создать пост</MyButton>
    </div>
  );
}
