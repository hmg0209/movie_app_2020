import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import '../scss/HeroSlider.scss';

function HeroSlider({ movies }) {
  const HERO_LENGTH = 5;
  movies = movies.slice(0, HERO_LENGTH);

  const [prev, setPrev] = useState(movies.length - 1);
  const [active, setActive] = useState(0);

  const slideRefs = useRef(
    [...new Array(movies.length)].map(() => React.createRef())
  );

  useEffect(() => {
    const slides = slideRefs.current.map((el) => el.current);
    const slidePrev = slides[prev];
    const slideActive = slides[active];

    const prevPoster = slidePrev.querySelector('.hero__poster');
    const activePoster = slideActive.querySelector('.hero__poster');
    const activeReveal = slideActive.querySelectorAll('.reveal');
    const prevReveal = slidePrev.querySelectorAll('.reveal');

    //slide 모션
    setActive(active);

    if (prev !== active) {
      for (let slide of slides) {
        slide.classList.remove('is-active');
      }

      slideActive.classList.add('is-active');
      MoveSlide();
    }

    function MoveSlide() {
      let tl = gsap.timeline({});

      tl.add(initSlide)
        .to(
          prevPoster,
          {
            duration: 0.45,
            ease: 'power2.out',
            x: '-35%',
            scale: '0.7',
          },
          'hide'
        )
        .to(
          prevPoster,
          {
            duration: 0.35,
            opacity: 0.5,
            ease: 'power2.out',
            x: '-10%',
          },
          'hide+=0.4'
        )
        .to(
          slidePrev.querySelectorAll('.reveal'),
          0.25,
          {
            ease: 'power2.out',
            opacity: 0,
            y: -20,
            stagger: 0.08,
          },
          'hide'
        )
        .to(
          slidePrev.querySelector('.hero__bg'),
          {
            duration: 0.4,
            ease: 'power1.in',
            opacity: 0,
          },
          'hide'
        )

        .to(
          activePoster,
          {
            duration: 0.15,
            opacity: 1,
          },
          'show-=0.35'
        )
        .to(
          activePoster,
          {
            ease: 'power1.out',
            duration: 0.35,
            x: '0%',
          },
          'show-=0.35'
        )
        .to(
          activeReveal,
          0.25,
          {
            ease: 'power2.inout',
            opacity: 1,
            y: 0,
            stagger: 0.08,
          },
          'show-=0.2'
        )
        .to(
          slideActive.querySelector('.hero__bg'),
          {
            duration: 0.4,
            ease: 'power1.in',
            opacity: 0.6,
          },
          'showEnd-=0.4'
        )
        .set(
          prevPoster,
          {
            opacity: 0,
          },
          'ShowEnd'
        );
    }

    function initSlide() {
      let tl = gsap.timeline();

      tl
        .set(activePoster, {
          opacity: 0,
          x: '60%',
          scale: 1,
          zIndex: 5,
        })
        .set(activeReveal, {
          opacity: 0,
          y: '-20',
        })
        .set(prevReveal, {
          opacity: 1,
          y: '0',
        });

      return tl;
    }
  }, [active, prev]);

  const updateActive = (e) => {
    const nodes = Array.prototype.slice.call(e.target.parentNode.children);

    setPrev(active);
    setActive(nodes.indexOf(e.target));
  };

  return (
    <section className="hero-section section">
      {movies.map((movie, i) => (
        <div className="hero" key={i} ref={slideRefs.current[i]}>
          <div
            className="hero__bg"
            style={{ backgroundImage: `url(${movie.background_image})` }}
          ></div>
          <div className="hero__box l-wrap">
            <div className="hero__cont">
              <span className="hero__brow reveal">BEST MOVIES</span>
              <div className="hero__detail reveal">
                <span className="hero__rating icon--star">{movie.rating}</span>
                <dl className="hero__genre list-box">
                  <dt className="a11y">genre</dt>
                  {movie.genres.map((genre, i) => (
                    <dd className="list-box__item" key={i}>{`${genre}`}</dd>
                  ))}
                </dl>
              </div>
              <h3 className="hero__title reveal">{movie.title}</h3>
              <p className="hero__summary reveal">
                {movie.summary.length > 300
                  ? `${movie.summary.substring(0, 300)}...`
                  : movie.summary}
              </p>
              <div className="func reveal">
                <Link
                  to={{ pathname: `/movie/${movie.id}` }}
                  className="btn btn--em"
                >
                  Go Detail
                </Link>

                <button type="button" className="btn">
                  Add List
                </button>
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
            <li
              className="hero__pagination-item"
              key={i}
              onClick={updateActive}
            >
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
