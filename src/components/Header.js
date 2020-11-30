import React from 'react';
import Navigation from './Navigation';

function Header({ onAuthPopupOpen, loggedIn, signOut, isSavedPath, setIsSavedPath, changePath, isBurgerOpen, onBurgerOpen, onClose, isAuthPopupOpen, isRegPopupOpen, isInfoPopupOpen }) {

  return (
    <>
    <header className={`header ${isSavedPath ? 'header_black' : ''}  ${isBurgerOpen ? 'header_blackBurger' : ''}`} 

    >
      <div className="header__navigation">
        <span className={`header__logo ${
          isBurgerOpen ? '' :          
          isSavedPath ? 'header__logo_black' : ''}`}>NewsExplorer</span>
        <Navigation 
          onAuthPopupOpen={onAuthPopupOpen}
          loggedIn={loggedIn}
          signOut={signOut}
          setIsSavedPath={setIsSavedPath}
          changePath={changePath}
          isSavedPath={isSavedPath}

          isBurgerOpen={isBurgerOpen}
          onBurgerOpen={onBurgerOpen}
          onClose={onClose}

          isAuthPopupOpen={isAuthPopupOpen}
          isRegPopupOpen={isRegPopupOpen}
          isInfoPopupOpen={isInfoPopupOpen}
        />
      </div>
    </header>
    </>
  );
}

export default Header;
