import React from 'react';
import '../scss/Detail.scss';

function Detail (props) {
  const { location, history } = props;

  if ( location.data === undefined ) {
    history.push('/');
  }

  if ( location.data ) {
    const { movie } = location.data;
    
    return (
      <div className="detail">sdfsdf
        <h1>{ movie.title }</h1>
      </div>
    );
  } else {
    return null;
  }
}

export default Detail;