import { useEffect, useRef, useState } from 'react';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import { usePosts } from '../hooks/usePosts';
import '../styles/App.css';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages,';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    sort: '',
    query: ''
  });

  const [modal, setModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () =>
    setPage(page + 1)
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, { ...newPost }]);
    setModal(false);
  };

  const removePost = (post) => {
    const filterPosts = posts.filter((item) => item.id !== post.id);
    setPosts(filterPosts);
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <>
      <MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
        limit={limit}
        setLimit={setLimit}
      />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        title={'Посты про JS'}
        posts={sortedAndSearchedPosts}
        remove={removePost}
      />
      <div ref={lastElement} style={{ height: 20, background: 'teal' }}></div>
      {isPostsLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px'
          }}>
          <Loader />
        </div>
      )}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </>
  );
}

export default Posts;
