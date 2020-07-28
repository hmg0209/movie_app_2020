import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Dropdown from '../component/Dropdown';
import Pagination from '../component/Pagination';

import '../scss/Movie.scss';

function Movie({ ratingMovies, titleMovies, yearMovies, likeMovies }) {
  // 영화 sort 데이터 변경
  const [movies, setMovies] = useState(ratingMovies);
  const [sortType, setSorting] = useState('rating');
  const sort = (type) => setSorting(type);

  // pagination
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentMovie = movies.slice(indexOfFirstPost, indexOfLastPost);
  const totalPage = Math.ceil(movies.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(()=> {
    if (sortType === 'rating') setMovies(ratingMovies);
    if (sortType === 'title') setMovies(titleMovies);
    if (sortType === 'year') setMovies(yearMovies);
    if (sortType === 'like') setMovies(likeMovies);

    setCurrentPage(1);
  }, [sortType, ratingMovies, titleMovies, yearMovies, likeMovies]);

  return (
    <section className="movie__section section">
      <div className="l-wrap">
        <div className="movie__filter">
          <Dropdown sort={sort}></Dropdown>
        </div>
        <div className="movie-list">
          {currentMovie.map((movie, i) => (
            <Link to={{
              pathname: `/movie/${movie.id}`,
              data: {
                movie
              }
            }} className="movie" key={i}>
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
                  {movie.genres.slice(0, 4).map((genre, i) => (
                    <li className="list-box__item" key={i}>{`#${genre}`}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
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
