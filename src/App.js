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
      'https://yts.mx/api/v2/list_movies.json?sort_by=title&limit=50'
    );

    this.setState({
      bestMovies: bestMovies,
      ratingMovies: ratingMovies,
      titleMovies: titleMovies,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, bestMovies, ratingMovies, titleMovies } = this.state;
    return (
      <section className="main">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="container">
            <HeroSlider movies={bestMovies} />
            <Movie movies={ratingMovies} />
          </div>
        )}
      </section>
    );
  }
}

export default App;
