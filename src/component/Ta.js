import React, { useState } from 'react';
import { dataBase, auth } from '../firebase/utils';

import '../scss/Ta.scss';

function Ta({ id }) {
  const CHAR_LIMIT = 300;
  const [charNum, setCharNum] = useState(0);
  const commentsData = dataBase.ref(`comments/${id}`);

  function countChar(e) {
    if (charNum < CHAR_LIMIT) {
      return setCharNum(e.target.value.length);
    }

    e.target.value = e.target.value.substring(0, CHAR_LIMIT);
    setCharNum(e.target.value.length);
  }

  function addComment(e) {
    const ta = e.target.parentElement.querySelector('.ta__input');
    const user = auth.currentUser;
    const date = new Date();
    console.log(date);

    commentsData.push().set({
      date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      text : ta.value,
      userName: user.displayName,
      email: user.email,
    });

    ta.value = '';
    setCharNum(0);
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
      <button type="button" className="ta__btn btn--em" onClick={ addComment }>
        comment
      </button>
    </div>
  );
}

export default Ta;
