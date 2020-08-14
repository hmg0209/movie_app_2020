import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Ta from '../component/Ta';
import CommentList from '../component/CommentList';

import '../scss/Detail.scss';

function Detail(props) {
  const id = props.location.pathname.replace('/movie/', '');
  const [movie, setMovie] = useState(null);
  const [suggestMovies, setSuggestMovies] = useState(null);

  const getMovie = async () => {
    const {
      data: {
        data: { movie },
      },
    } = await axios.get(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    await setMovie(movie);

    const {
      data: {
        data: { movies: suggestMovies },
      },
    } = await axios.get(
      `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`
    );

    await setSuggestMovies(suggestMovies);
  };

  useEffect(() => {
    getMovie();
  });

  if (movie === null || suggestMovies === null) {
    return (
      <div className="loader">
        <span className="loader__text">Loading...</span>
      </div>
    );
  }

  return (
    <div className="detail">
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${movie.background_image})` }}
      >
        <div className="detail__cont l-wrap">
          <span className="detail__poster">
            <img
              src={movie.medium_cover_image}
              alt={`${movie.title} poster`}
            ></img>
          </span>
          <div className="detail__data">
            <h1 className="detail__title">{movie.title}</h1>
            <dl className="list-box">
              <dt className="a11y">genre</dt>
              {movie.genres.map((genre, i) => (
                <dd className="list-box__item" key={i}>{`${genre}`}</dd>
              ))}
            </dl>
            <span className="icon--star">{movie.rating}</span>
            <span className="detail__year">{movie.year}</span>
            <span className="detail__time">
              {`${Math.floor(movie.runtime / 60)}h
                ${movie.runtime - Math.floor(movie.runtime / 60) * 60}m`}
            </span>
            <div className="detail__description-box">
              <p className="detail__description">{movie.description_full}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="detail-content l-wrap">
        <section className="detail-comment">
          <div className="detail-comment__ta">
            <Ta id={movie.id} />
          </div>
          <CommentList id={movie.id} />
        </section>
        <div className="detail-recommend">
          <aside className="recommend-aside">
            <h2 className="recommend-aside__h">recommend</h2>
            <ul className="recommend-aside__list">
              {suggestMovies.map((suggestMovie, i) => (
                <li className="item" key={i}>
                  <span className="item__img-box">
                    <img
                      src={suggestMovie.medium_cover_image}
                      alt={`${suggestMovie.title} poster`}
                    ></img>
                  </span>
                  <div className="item__cont">
                    <span className="item__title">{suggestMovie.title}</span>
                    <span className="item__rating icon--star">
                      {suggestMovie.rating}
                    </span>
                    <span className="item__year">{suggestMovie.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Detail;
