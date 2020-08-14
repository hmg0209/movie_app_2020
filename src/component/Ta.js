import React, { useState, useEffect } from 'react';
import { dataBase, auth } from '../firebase/utils';

import '../scss/Ta.scss';

function Ta({ id }) {
  const CHAR_LIMIT = 300;
  const [char, setChar] = useState('');
  const commentsData = dataBase.ref(`comments/${id}`);

  useEffect(() => {
    if (char.length > CHAR_LIMIT) {
      setChar(char.substring(0, CHAR_LIMIT));
    }
  }, [char]);

  function countChar(e) {
    setChar(e.target.value);
  }

  function addComment(e) {
    const ta = e.target.parentElement.querySelector('.ta__input');
    const user = auth.currentUser;
    const date = new Date();

    commentsData.push().set({
      date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      text : ta.value,
      userName: user.displayName,
      email: user.email,
    });

    setChar('');
  }

  return (
    <div className="ta-box">
      <div className="ta">
        <textarea 
          className="ta__input" 
          value={ char } 
          onChange={ countChar }></textarea>
        <div className="ta__counter">
          <span className="ta-conter__current">{ char.length }</span> / 
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
