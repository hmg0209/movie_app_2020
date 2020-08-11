import React, { useState } from 'react';

import '../scss/Ta.scss';

function Ta() {
  const CHAR_LIMIT = 300;
  const [charNum, setCharNum] = useState(0);

  function countChar(e) {
    if (charNum < CHAR_LIMIT) {
      return setCharNum(e.target.value.length);
    }

    e.target.value = e.target.value.substring(0, CHAR_LIMIT);
    setCharNum(e.target.value.length);
  }

  return (
    <div className="ta-box">
      <div className="ta">
        <textarea className="ta__input" onChange={ countChar }></textarea>
        <div className="ta__counter">
          <span className="ta-conter__current">{ charNum }</span> / 
          <span className="ta-conter__total">{ CHAR_LIMIT }</span>
        </div>
      </div>
      <button type="button" className="ta__btn btn--em">
        comment
      </button>
    </div>
  );
}

export default Ta;
