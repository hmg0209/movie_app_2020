import React from 'react';
import axios from 'axios';
import Movie from './component/Movie';
import HeroSlider from './component/HeroSlider';
import './scss/App.scss';

class App extends React.Component {
  state = {
    isLoading: true,
    bestMovies: [],
    ratingMovies: [],
  };


  // 데이터 호출
  getMovies = async () => {
    const {
      data: {
        data: { movies: bestMovies },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=4'
    );

    const {
      data: {
        data: { movies: ratingMovies },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=50'
    );

    const {
      data: {
        data: { movies: titleMovies },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=title&limit=40'
    );

    const {
      data: {
        data: { movies: yearMovies },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=year&limit=35'
    );

    const {
      data: {
        data: { movies: likeMovies },
      },
    } = await axios.get(
      'https://yts.mx/api/v2/list_movies.json?sort_by=like_count&limit=48'
    );

    this.setState({
      bestMovies: bestMovies,
      ratingMovies: ratingMovies,
      titleMovies: titleMovies,
      yearMovies: yearMovies,
      likeMovies: likeMovies,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, bestMovies, ratingMovies, titleMovies, yearMovies, likeMovies } = this.state;
    return (
      <section className="main">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="container">
            <HeroSlider movies={bestMovies} />
            <Movie 
              ratingMovies={ratingMovies} 
              titleMovies={titleMovies}
              yearMovies={yearMovies}
              likeMovies={likeMovies}/>
          </div>
        )}
      </section>
    );
  }
}

export default App;
