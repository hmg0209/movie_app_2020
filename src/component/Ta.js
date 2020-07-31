import React from 'react';

import '../scss/Ta.scss';

function Ta() {
  return (
    <div className="ta-box">
      <div className="ta">
        <textarea className="ta__input"></textarea>
          <div className="ta__counter">
          <span className="ta-conter__current">30</span> /
          <span className="ta-conter__total">500</span>
        </div>
      </div>
      <button type="button" className="ta__btn btn--em">
        comment
      </button>
    </div>
  );
}

export default Ta;
