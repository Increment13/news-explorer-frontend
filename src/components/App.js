import React, { useEffect, useState } from 'react';

import Main from './Main';
import AuthPopup from './AuthPopup';
import RegistrationPopup from './RegistrationPopup';
import SavedNews from './SavedNews';
import Footer from './Footer';
import InfoPopup from './InfoPopup';
import Burger from './Burger';

import CurrentUserContext from "../contexts/CurrentUserContext";
import { Route, useHistory } from 'react-router-dom';
import '../index.css';
import * as auth from '../auth.js';

function App() {

  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFoundResult, setIsNotFoundResult] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [articles, setArticles] = useState();
  const [isSavedPath, setIsSavedPath] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  //установить при логине наличие сохраненных карт
  const [isSaveCard, setIsSaveCard] = useState(false);

  const history = useHistory();

  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getUser(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
        }
      });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);


  function closeAllPopups() {
    setIsAuthPopupOpen(false);
    setIsRegPopupOpen(false);
    setIsInfoPopupOpen(false);
    setIsBurgerOpen(false);
  }

  function handleInfoOpen() {
    setIsInfoPopupOpen(true);
  }

  function handleBurgerOpen() {
    setIsBurgerOpen(true);
  }

  function handleKeyDownEsc(e) {
    if (e.keyCode === 27) {
      closeAllPopups();
    }
  }

  function handleAuthPopupOpen() {
    setIsAuthPopupOpen(true);
  }

  function handleInfoClose() {
    setIsInfoPopupOpen(false);
    setIsAuthPopupOpen(true);
  }

  function handleSwitchPopupOpen() {
    setIsRegPopupOpen(!isRegPopupOpen);
    setIsAuthPopupOpen(!isAuthPopupOpen);
  }

  const onAuth = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }

        if (data.jwt && data.data) {
          setLoggedIn(true);
        }
      });
  };

  function hadleLogin() {
    setLoggedIn(true);
    history.push('/');
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/');
  }

  function changePath(status) {
    setIsSavedPath(status)
   }
   
  useEffect(() => {
    if (window.location.pathname === '/saved-news') {
      setIsSavedPath(true);
    }

    if (!loggedIn) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getUser(jwt)
        .then((res) => {
          if (res._id) {
            setCurrentUser(res);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

 


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Route path="/saved-news">
          <SavedNews
            currentUser={currentUser}
            loggedIn={loggedIn}
            signOut={signOut}
            setIsSavedPath={setIsSavedPath}
            changePath={changePath}
            isSavedPath={isSavedPath}
            onSetArticles={setArticles}
            isSaveCard={isSaveCard}

            isBurgerOpen={isBurgerOpen}
            onBurgerOpen={handleBurgerOpen}
            onClose={closeAllPopups}

            setIsAuthPopupOpen={setIsAuthPopupOpen}
            setIsRegPopupOpen={setIsAuthPopupOpen}
            setIsInfoPopupOpen={setIsAuthPopupOpen}
          />
        </Route>
        <Route exact path="/">
          <Main
            onAuthPopupOpen={handleAuthPopupOpen}
            loggedIn={loggedIn}
            signOut={signOut}
            onSetIsLoading={setIsLoading}
            onSetIsNotFoundResult={setIsNotFoundResult}
            onSetIsResult={setIsResult}
            onSetArticles={setArticles}
            isLoading={isLoading}
            isNotFoundResult={isNotFoundResult}
            isSavedPath={isSavedPath}
            isResult={isResult}
            articles={articles}
            currentUser={currentUser}
            setIsSavedPath={setIsSavedPath}
            changePath={changePath}

            isBurgerOpen={isBurgerOpen}
            onBurgerOpen={handleBurgerOpen}
            onClose={closeAllPopups}

            isAuthPopupOpen={isAuthPopupOpen}
            isRegPopupOpen={isRegPopupOpen}
            isInfoPopupOpen={isInfoPopupOpen}
          />
        </Route>

        <Burger 
        isBurgerOpen={isBurgerOpen}
        onClose={closeAllPopups}

        onAuthPopupOpen={handleAuthPopupOpen}
        loggedIn={loggedIn}
        signOut={signOut}
        />
        <AuthPopup
          onAuth={onAuth}
          hadleLogin={hadleLogin}
          isOpen={isAuthPopupOpen}
          onClose={closeAllPopups}
          onSwitchPopupOpen={handleSwitchPopupOpen}
          onDownEsc={handleKeyDownEsc}
        />
        <RegistrationPopup
          isOpen={isRegPopupOpen}
          onClose={closeAllPopups}
          onSwitchPopupOpen={handleSwitchPopupOpen}
          onDownEsc={handleKeyDownEsc}
          handleInfoOpen={handleInfoOpen} />
        <InfoPopup
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          onInfoClose={handleInfoClose}
          onDownEsc={handleKeyDownEsc}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
