import React from 'react';
import '../scss/Pagination.scss';

function Pagination({ currentPage, totalPage, paginate }) {
  const pageNumber = [];

  for (let i = 1; i<=totalPage; i++) {
    pageNumber.push(i);
  }

  function goNext() {
    if (currentPage !== totalPage) {
      currentPage += 1;
      paginate(currentPage);
    }
  }

  function goPrev() {
    if (currentPage !== 1) {
      currentPage -= 1;
      paginate(currentPage)
    }
  }
  return (
    <div className="pagination">
      <button 
        type="button" 
        className={`pagination__btn ${currentPage === 1 ? 'is-disable' : ''}`}
        onClick={() => goPrev()}>
        prev
      </button>
      {pageNumber.map((pageNum, i) => (
        <button 
        key={i} 
        type="button" 
        className={`pagination__btn ${currentPage === pageNum ? 'is-active' : ''}`}
        onClick={() => paginate(pageNum)}>
          {pageNum}
        </button>
      ))}
      <button 
        type="button" 
        className={`pagination__btn ${currentPage === totalPage ? 'is-disable' : ''}`}
        onClick={() => goNext()}>
        next
      </button>
    </div>
  );
}

export default Pagination;
