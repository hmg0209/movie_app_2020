import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import Pagination from '../component/Pagination';

import '../scss/Movie.scss';

function Movie({ movies, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = movies.slice(indexOfFirstPost, indexOfLastPost);
  const totalPage = Math.ceil(movies.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    function SetGridItemHeight() {
      let grid = document.getElementsByClassName('movie-list')[0];
      let rowHeight = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
      );
      let rowGap = parseInt(
        window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
      );

      let item = grid.getElementsByClassName('movie');
      for (let i = 0; i < item.length; ++i) {
        item[i].style.gridRowEnd = `span ${Math.ceil(
          item[i].children[0].offsetHeight / (rowHeight + rowGap) + 1
        )}`;

      }
    }

    function MoveGridItem(){

    }

    if (!isLoading) {
      // [Fix]: offsetHeight의 값이 들쑥날쑥. 시점 조정 필요.
      setTimeout(()=> {
        SetGridItemHeight();
      }, 600);
    }
  }, [isLoading, currentPage]);

  return (
    <section className="section">
      <div className="movie-list l-wrap">
        {currentMovie.map((movie, i) => (
          <div className="movie" key={i}>
            <div className="movie__inner">
              <span className="movie__poster">
                <img
                  className="movie__poster-img"
                  src={movie.large_cover_image}
                  alt={movie.title + ' 포스터'}
                ></img>
              </span>
              <div className="movie__data">
                <h2 className="movie__title">{movie.title}</h2>
                <ul className="movie__genres list-box">
                  {movie.genres.map((genre, i) => (
                    <li className="list-box__item" key={i}>{`#${genre}`}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPage={totalPage} paginate={paginate}/>
    </section>
  );
}

Movie.PropType = {
  id: PropType.number.isRequired,
  year: PropType.number.isRequired,
  title: PropType.string.isRequired,
  summary: PropType.string.isRequired,
  poster: PropType.string.isRequired,
  genres: PropType.array.isRequired,
};

export default Movie;
