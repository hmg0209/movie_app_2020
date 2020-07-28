import React, { useState, useEffect } from 'react';
import '../scss/Dropdown.scss';

function Dropdown({sort}) {
  const [isOpened, toggelDropdown] = useState(false);

  function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');

    if (isOpened) {
      return dropdown.classList.add('is-opened');
    }

    return dropdown.classList.remove('is-opened');
  }

  function selectOption(e) {
      document.querySelector('.dropdown__selected').innerHTML = e.target.value;
      document.querySelector('.dropdown').classList.remove('is-opened');
      toggelDropdown(!isOpened);
      sort(e.target.value);
  }

  useEffect(() => {
    toggleDropdown();
  }, [isOpened]);

  return (
    <div className="dropdown">
      <button
        type="button"
        className="dropdown__selected"
        onClick={() => toggelDropdown(!isOpened)}
      >
        rating
      </button>
      <div className="dropdown__options">
        <button 
          type="button"
          value="rating"
          onClick={(e) => selectOption(e)} 
          className="dropdown__option">
          rating
        </button>
        <button 
          type="button"
          value="title"
          onClick={(e) => selectOption(e)} 
          className="dropdown__option">
          title
        </button>
        <button 
          type="button"
          value="year"
          onClick={(e) => selectOption(e)} 
          className="dropdown__option">
          year
        </button>
        <button 
          type="button"
          value="like"
          onClick={(e) => selectOption(e)} 
          className="dropdown__option">
          like
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
