import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../component/Movie';
import HeroSlider from '../component/HeroSlider';
import '../scss/Home.scss';

function Home() {

  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isAllLoading, setAllLoading] = useState(true);
  const [heroMovies, setHeroMovies] = useState([]);
  const [sortList, setSortList] = useState([]);

  const getMovies = async () => {
    const {
      data: {
        data: { movies: heroMovies },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=4'
    );

    const {
      data: {
        data: { movies: rating },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=50'
    );

    await setHeroMovies(heroMovies);
    await setSortList((arr) => {
      return {...arr, rating};
    });

    await setFirstLoading(false);

    const {
      data: {
        data: { movies: title },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=title&limit=40'
    );

    const {
      data: {
        data: { movies: year },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=35'
    );

    const {
      data: {
        data: { movies: like },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=like_count&limit=48'
    );

    await setSortList((arr) => {
      return {...arr, title, year, like};
    });
    await setAllLoading(false);
  };

  useEffect(() => {
    getMovies();
    console.log('aaa');
  }, []);

  return (
    <section className="main">
      {isFirstLoading ? (
        <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
      ) : (
        <div className="container">
          <HeroSlider movies={heroMovies} />
          <Movie sortList={sortList} isAllLoading={isAllLoading}/>
        </div>
      )}
    </section>
  );
}

export default Home;
