import React from 'react';
import { Link } from 'react-router-dom';
import imgLogout from '../images/logout.svg';
import imgLogoutBlack from '../images/logout_black.svg';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Burger({ onAuthPopupOpen, loggedIn, signOut, isSavedPath, isBurgerOpen, onClose, changePath }) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    if (!loggedIn) {
      onClose();
      onAuthPopupOpen();
    } else {
      onClose();
      signOut();
    }
  }

  function hadleToMain() {
    changePath(false);
    setTimeout(() => {
      onClose();
    }, 150);
  }

  function  hadleToSavedPath() {
    changePath(true);
    setTimeout(() => {
      onClose();
    }, 150);
  }

  return (
    <div className={`burger ${isBurgerOpen ? 'burger_opened' : ''}`}>
      <nav className="burger__box">
      <ul className="burger__links">
        <li className="burger__list">
          <Link to="/" className="burger__link" onClick={hadleToMain}>Главная</Link>
        </li>
        
        {loggedIn ? 
        <li className="burger__list">
          <Link to="/saved-news" className="burger__link"  onClick={hadleToSavedPath}>Сохранённые статьи</Link>
        </li>
          : null
         }

        <li className="burger__list">
          <button className={`burger__button ${isSavedPath ? 'burger__button_black ' : ''}`} onClick={handleClick}>{` ${loggedIn ? (currentUser.name) : 'Авторизоваться'}`}
            {loggedIn &&
              <img className="burger__buttonImg" src={isSavedPath ? imgLogoutBlack : imgLogout} alt="выйти" />
            }
          </button>
        </li>
      </ul>
      </nav>
    </div>
  );
}

export default Burger;
