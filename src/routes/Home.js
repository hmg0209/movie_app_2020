import React from 'react';
import axios from 'axios';
import Movie from '../component/Movie';
import HeroSlider from '../component/HeroSlider';
import '../scss/Home.scss';

// [Fix] 이 컴포넌트만 함수형이 아닌 class 컴포넌트,
// 함수형으로 바꿔볼것.
// 함수형으로 모든 컴포넌트를 사용하는것이 이익인가 고민 필요.
class Home extends React.Component {
  state = {
    isLoading: true,
    bestMovies: [],
    ratingMovies: [],
  };

  // 데이터 호출
  // [Fix] 쿼리 뒤의 sort_by/limit를 변수처리해서 리팩토링 가능할까?
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
    
    // [Fix] set state의 변수를 객체가 담긴 배열으로 전달?
    // sort_type이라는 하나의 변수로 전달하는게 더 좋은 방법일까?
    // 명시하는게 더 좋을까..? render 아래 변수 너무 지저분하고,
    // 컴포넌트로 하나하나 전달해야하는 번거로움.
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

export default Home;
