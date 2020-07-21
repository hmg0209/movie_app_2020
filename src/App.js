import React from 'react';
import propTypes from 'prop-types';

const foodILike = [
  {id: 1, name: "김치", rating: 5}, 
  {id: 2, name: "삼겹살", rating: 4.3}, 
  {id: 3, name: "소고기", rating: 1.2}, 
  {id: 4, name: "양고기", rating: 3}, 
  {id: 5, name: "버블티", rating: 1},
];

function Food({ name, rating }) {
  return (
  <div>
    <h3>I like { name }</h3>
    <p>{ rating }/5.0</p>
  </div>
  );
}

Food.propTypes = {
  name: propTypes.string.isRequired,
  rating: propTypes.number.isRequired,
}

function App() {
  return (
    <div className="App">
      <h1>안녕!!!</h1>
      { foodILike.map(dish => <Food 
        key={ dish.id } 
        name={ dish.name } 
        rating={ dish.rating }/>) }
    </div>
  );
}

export default App;
