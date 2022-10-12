import React from 'react';
import { usePagination } from '../../../hooks/usePagination';

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = usePagination(totalPages);
  return (
    <div className="page__wrapper">
      {pagesArray.map((item) => (
        <button
          className={item === page ? 'page page__current' : 'page'}
          onClick={() => changePage(item)}
          key={item}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
