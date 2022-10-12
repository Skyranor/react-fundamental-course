import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';

const PostList = ({ title, posts, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>;
  }

  const postId = (index) => index + 1;
  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: 20 }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition
            key={post.id || postId(index)}
            timeout={500}
            classNames="post">
            <PostItem post={post} remove={remove} number={postId(index)} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default PostList;
