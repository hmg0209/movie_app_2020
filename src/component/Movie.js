import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Dropdown from '../component/Dropdown';
import Pagination from '../component/Pagination';

import '../scss/Movie.scss';

function Movie({ sortList, isAllLoading }) {
  // 영화 sort 데이터 변경
  const sortDefalt = 'rating';
  const [movies, setMovies] = useState(sortList[sortDefalt]);
  const [sortType, setSorting] = useState(sortDefalt);
  const sort = (type) => setSorting(type);

  // pagination
  const [postsPerPage] = useState(14);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = movies.slice(indexOfFirstPost, indexOfLastPost);
  const totalPage = Math.ceil(movies.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!isAllLoading) {
      if (sortType === 'rating') setMovies(sortList.rating);
      if (sortType === 'title') setMovies(sortList.title);
      if (sortType === 'year') setMovies(sortList.year);
      if (sortType === 'like') setMovies(sortList.like);
      setCurrentPage(1);
    }
  }, [sortType, sortList, isAllLoading]);

  console.log(sortList.rating);

  return (
    <section className="movie-list__section section">
      <div className="l-wrap">
        <div className="movie__filter">
          <Dropdown sort={sort}></Dropdown>
        </div>
        <div className="movie-list">
          {isAllLoading && sortType !== sortDefalt ? (
            <div>로딩중이야....</div>
          ) : (
            currentMovie.map((movie, i) => (
              <Link
                to={{
                  pathname: `/movie/${movie.id}`,
                  data: {
                    movie,
                  },
                }}
                className="movie"
                key={i}
              >
                <span className="movie__poster">
                  <img
                    className="movie__poster-img"
                    src={movie.large_cover_image}
                    alt={movie.title + ' 포스터'}
                  ></img>
                </span>
                <div className="movie__cont">
                  <h2 className="movie__title">{movie.title}</h2>
                  <div className="movie__detail">
                    <span className="movie__year">{movie.year}</span>
                    <div className="movie__utils">
                      <span className="movie__like icon--like"></span>
                      <span className="movie__watch icon--watch"></span>
                      <span className="movie__rating icon--star">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          paginate={paginate}
        />
      </div>
    </section>
  );
}

export default Movie;
