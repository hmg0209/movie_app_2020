// https://ko.reactjs.org/docs/hooks-reference.html#usereducer

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

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
  const totalPage = Math.ceil(movies.length / postsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [currentMovie, setCurrentMovie] = useState(movies.slice(0, 14));

  // sortType 변경 시 
  useEffect(() => {
    if(!isAllLoading) {
      if (sortType === 'rating') setMovies(sortList.rating);
      if (sortType === 'title') setMovies(sortList.title);
      if (sortType === 'year') setMovies(sortList.year);
      if (sortType === 'like') setMovies(sortList.like);
      setCurrentPage(1);
      changeList(setCurrentList);
      }
  }, [sortType, movies, isAllLoading])

  // Pagination 변경 시 
  useEffect(() => {
    changeList(setCurrentList);
  }, [currentPage])

  function setCurrentList() {
    setCurrentMovie(movies.slice(indexOfFirstPost, indexOfLastPost));
  }

  function changeList(setList) {
    const movieItem = document.querySelectorAll('.movie');

    gsap
    .timeline()
    .set(movieItem, {
      y: 0,
      opacity: 1,
    })
    .to(movieItem, {
      y: -70,
      opacity: 0,
      duration: 0.3,
      onComplete: setList,
    })
    .to(movieItem, {
      delay: 0.1,
      y: 0,
      opacity: 1,
      stagger: {
        amount: 0.55,
        from: "center",
      }
    });
  }


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
              <div className="movie" key={i}>
                <Link
                  to={{
                    pathname: `/movie/${movie.id}`,
                    data: {
                      movie,
                    },
                  }}
                  className="movie__link"
                >
                  <span className="movie__poster">
                    <img
                      className="movie__poster-img"
                      src={movie.medium_cover_image}
                      alt={movie.title + ' 포스터'}
                    ></img>
                  </span>
                </Link>
                <div className="movie__cont">
                  <h2 className="movie__title">{movie.title}</h2>
                  <div className="movie__detail">
                    <span className="movie__year">{movie.year}</span>
                    <div className="movie__utils">
                      <span className="movie__rating icon--star">
                        {movie.rating}
                      </span>
                      <span className="movie__like icon--like"></span>
                    </div>
                  </div>
                </div>
              </div>
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
