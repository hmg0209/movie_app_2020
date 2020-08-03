import React from 'react';

import Ta from '../component/Ta';
import CommentList from '../component/CommentList';

import '../scss/Detail.scss';

function Detail(props) {
  const { location, history } = props;

  if (location.data === undefined) {
    history.push('/');
  }

  if (location.data) {
    const { movie } = location.data;
    console.log(movie);

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
              <span>{movie.year}</span>
              <span>{movie.runtime}</span>
              <div className="detail__description-box">
                <p className="detail__description">{movie.description_full}</p>
              </div>
            </div>
          </div>
        </section>
        <div className="detail-content l-wrap"> 
          <section className="detail-comment">
            <div className="detail-comment__ta">
              <Ta/>
            </div>
            <CommentList/>
          </section>
          <div className="detail-recommend">
            <aside className="recommend-aside">
              <h2 className="recommend-aside__h">recommend</h2>
              <ul className="recommend-aside__list">
                <li className="item">
                  <span className="item__img-box">
                    <img 
                    src={movie.medium_cover_image}
                    alt={`${movie.title} poster`}></img>
                  </span>
                  <div className="item__cont">
                    <span className="item__title">{movie.title}</span>
                    <span className="item__rating icon--star">{movie.rating}</span>
                    <span className="item__year">{movie.year}</span>
                  </div>
                </li>
                <li className="item">
                  <span className="item__img-box">
                    <img 
                    src={movie.medium_cover_image}
                    alt={`${movie.title} poster`}></img>
                  </span>
                  <div className="item__cont">
                    <span className="item__title">{movie.title}</span>
                    <span className="item__rating icon--star">{movie.rating}</span>
                    <span className="item__year">{movie.year}</span>
                  </div>
                </li>
                <li className="item">
                  <span className="item__img-box">
                    <img 
                    src={movie.medium_cover_image}
                    alt={`${movie.title} poster`}></img>
                  </span>
                  <div className="item__cont">
                    <span className="item__title">{movie.title}</span>
                    <span className="item__rating icon--star">{movie.rating}</span>
                    <span className="item__year">{movie.year}</span>
                  </div>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Detail;
