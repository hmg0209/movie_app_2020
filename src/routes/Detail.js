import React from 'react';
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
        <div className="l-wrap">
          <section
            className="hero-section section"
            style={{ backgroundImage: `url(${movie.background_image})` }}
          >
            <div className="detail__cont">
              <span className="detail__poster">
                <img
                  src={movie.medium_cover_image}
                  alt={`${movie.title} poster`}
                ></img>
              </span>
              <div className="detail__data">
                <h1 className="detail__title">{movie.title}</h1>
                <span className="icon--star">{movie.rating}</span>
                <dl className="list-box">
                  <dt className="a11y">genre</dt>
                {movie.genres.map((genre, i) => (
                  <dd className="list-box__item" key={i}>{`${genre}`}</dd>
                ))}
                </dl>
                <span>{ movie.year }</span>
                <span>{ movie.runtime }</span>
                <p>{ movie.description_full }</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Detail;
