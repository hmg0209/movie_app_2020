import React from 'react';
import axios from 'axios';
import Movie from './component/Movie';
import HeroSlider from './component/HeroSlider';
import './scss/App.scss';

class App extends React.Component {
  state = {
    isLoading: true,
    bestMovies: [],
    movies: [],
  };

  getBestMovies = async () => {
    const {
      data: {
        data: { movies: bestMovies },
      },
    } = await axios.get(
      'https://yts-proxy.now.sh/list_movies.json?sort_by=rating&limit=3'
    );

    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      'https://yts-proxy.now.sh/list_movies.json?sort_by=rating&limit=50'
    );

    this.setState({ bestMovies: bestMovies, movies: movies, isLoading: false });

  };

  componentDidMount() {
    this.getBestMovies();
  }

  render() {
    const { isLoading, bestMovies, movies } = this.state;
    return (
      <section className="main">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="container">
            <HeroSlider movies={bestMovies} />
            <Movie movies={movies} isLoading={isLoading} />
          </div>
        )}
      </section>
    );
  }
}

export default App;
