import { AddPost } from '../../components/AddPost/AddPost.jsx';
import { Wall } from '../Wall/Wall.jsx';
import { useState, useEffect, useRef } from 'react';
import { MyModal } from '../../components/UI/modal/MyModal.jsx';
import { MyButton } from '../../components/UI/button/MyButton.jsx';
import { useSorted } from './../../hooks/useSorted.jsx';
import PostService from './../../API/PostService.js';
import { Loader } from '../../components/UI/loader/Loader.jsx';
import { getPageCount } from '../../utils/pages.js';
import { Pagination } from '../../components/UI/Pagination/Pagination.jsx';
import { useFetching } from './../../hooks/useFetching.jsx';
import { useObserver } from '../../hooks/useObserver.jsx';
import { MySelect } from '../../components/UI/select/MySelect.jsx';

export function Posts() {
  const [postsLists, setPostsLists] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const filterAsDep = useSorted();
  const lastElement = useRef();

  //Запрос на сервер для получения постов
  const [fetching, isLoading, error] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPostsLists([...postsLists, ...response.data]);
    // реализация пагинации
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, isLoading, () => setPage(page + 1));

  // Отслеживание данных для запроса
  useEffect(() => {
    fetching(limit, page);
  }, [filterAsDep.selectedSort, page, limit]);

  // Обработчик переключения страниц
  const onClickPagination = (p) => {
    setPage(p);
    setLimit((prev) => prev);
  };
  // Обработчик для открытий модального окна
  const onClickVisibleModal = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Блог</h1>
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
          <Loader />
        </div>
      )}
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Кол-во элементов на странице"
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 20, name: '20' },
          { value: -1, name: 'Показать все' },
        ]}
      />
      <Wall postsLists={postsLists} setPostsLists={setPostsLists} />

      <div ref={lastElement} style={{ height: 20, background: 'red' }} />
      {error && (
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
