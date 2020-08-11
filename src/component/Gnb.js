import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signInWithGoogle, auth } from '../firebase/utils';

import '../scss/Gnb.scss';

function Gnb() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="gnb">
      <div className="l-wrap">
        <Link to="/" className="gnb__d1">
          Home
        </Link>
        {user ? (
          <button
            type="button"
            className="gnb__d1"
            onClick={() => auth.signOut()}
          >
            로그아웃
          </button>
        ) : (
          <button type="button" className="gnb__d1" onClick={signInWithGoogle}>
            google 로그인
          </button>
        )}
      </div>
    </div>
  );
}

export default Gnb;
