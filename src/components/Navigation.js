import React from 'react';
import { Link } from 'react-router-dom';
import imgLogout from '../images/logout.svg';
import imgLogoutBlack from '../images/logout_black.svg';
import imgBurger from '../images/burger.svg';
import imgBurgerBlack from '../images/burgerblack.svg';

import CurrentUserContext from "../contexts/CurrentUserContext";

function Navigation({ onAuthPopupOpen, loggedIn, signOut, changePath, isSavedPath, isBurgerOpen, onBurgerOpen, onClose, isAuthPopupOpen, isRegPopupOpen, isInfoPopupOpen }) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    if (!loggedIn) {
      onAuthPopupOpen();
    } else {
      signOut();
    }
  }

  function hadleToMain() {
    changePath(false);
  }

  function  hadleToSavedPath() {
    changePath(true);
  }



  return (
    <nav>
      <ul className="header__links">
        <li className={`header__list ${!isSavedPath ? 'header__list_active' : ''}`}>
          <Link to="/" className={`header__link  ${isSavedPath ? 'header__link_black ' : ''}`}
            onClick={hadleToMain}
          >Главная</Link>
        </li>
        <li className={`header__list  ${loggedIn ? '' : 'header__list_hide'} ${isSavedPath ? 'header__list_activeBlack ' : ''}`}>
          <Link to="/saved-news" className={`header__link ${isSavedPath ? 'header__link_black ' : ''}`}
            onClick={hadleToSavedPath}
          >Сохранённые статьи</Link>
        </li>
        <li className="header__list">
          <button className={`header__button ${isSavedPath ? 'header__button_black ' : ''}`} onClick={handleClick}>{` ${loggedIn ? (currentUser.name) : 'Авторизоваться'}`}
            {loggedIn &&
              <img className="header__buttonImg" src={isSavedPath ? imgLogoutBlack : imgLogout} alt="выйти" />
            }
          </button>
        </li>
      </ul>

      {isBurgerOpen || isAuthPopupOpen || isRegPopupOpen || isInfoPopupOpen ?
        <button className="header__burger header__burger_open-popup" onClick={onClose} />
        : <button className="header__burger" onClick={onBurgerOpen}><img src={!isSavedPath ? imgBurger : imgBurgerBlack} alt="" />
        </button>
      }
    </nav>
  );
}

export default Navigation;
