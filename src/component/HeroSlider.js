import React from 'react';
import '../scss/HeroSlider.scss';

function HeroSlider({ movies }) {
  let prev = 0;

  const slideChange = (e) => {
    const nodes = Array.prototype.slice.call(e.target.parentNode.children);
    let active = nodes.indexOf(e.target);

    document.querySelectorAll('.hero')[prev].style.opacity = 0;
    document.querySelectorAll('.hero')[prev].style.visibility = 'hidden';

    document.querySelectorAll('.hero')[active].style.opacity = 1;
    document.querySelectorAll('.hero')[active].style.visibility = 'visible';

    prev = active;
  };

  return (
    <section className="hero-section section">
      {movies.map((movie, i) => (
        <div className="hero" key={i}>
          <div className="hero__bg">
            <div
              className="hero__bg-img"
              style={{ backgroundImage: `url(${movie.background_image})` }}
            ></div>
          </div>
          <div className="hero__box l-wrap">
            <div className="hero__cont">
              <span className="hero__brow">BEST MOVIES</span>
              <h3 className="hero__title">{movie.title}</h3>
              <ul className="list-box">
                {movie.genres.map((genre, i) => (
                  <li className="list-box__item" key={i}>{`#${genre}`}</li>
                ))}
              </ul>
              <p className="hero__summary">{movie.summary}</p>
              <div className="func">
                <a href="/" className="btn">
                  더보기
                </a>
              </div>
            </div>
            <div className="hero__poster">
              <img
                src={movie.large_cover_image}
                alt={`${movie.title} poster`}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="hero__controller">
        <ul className="hero__pagination">
          {movies.map((movie, i) => (
            <li className="hero__pagination-item" key={i} onClick={slideChange}>
              <span className="a11y">{`${i}번 슬라이드로 이동`}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

HeroSlider.PropType = {};

export default HeroSlider;
