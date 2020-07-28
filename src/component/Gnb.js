import React from 'react';
import { Link } from 'react-router-dom';

import '../scss/Gnb.scss';

function Gnb() {
  return (
    <div className="gnb">
      <div className="l-wrap">
        <Link to="/" className="gnb__link">
          Home
        </Link>
      </div>
    </div>
  );
}

export default Gnb;
