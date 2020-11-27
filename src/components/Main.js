import React from 'react';
import SearchForm from './SearchForm';
import Header from './Header';
import About from './About';
import Preloader from './Preloader';
import NewsCardList from './NewsCardList';
import NotFoundResult from './NotFoundResult';

function Main({ onAuthPopupOpen,
  loggedIn,
  signOut,
  onSetIsLoading,
  onSetIsNotFoundResult,
  onSetIsResult,
  onSetArticles,
  isLoading,
  isNotFoundResult,
  isResult,
  isSavedPath,
  articles,
  setIsSavedPath,
  changePath,
  isBurgerOpen,
  onBurgerOpen,
  onClose, 
  isAuthPopupOpen, isRegPopupOpen, isInfoPopupOpen }) {
  return (
    <>
      <Header
        onAuthPopupOpen={onAuthPopupOpen}
        loggedIn={loggedIn}
        signOut={signOut}
        setIsSavedPath={setIsSavedPath}
        changePath={changePath}

        isBurgerOpen={isBurgerOpen}
        onBurgerOpen={onBurgerOpen}
        onClose={onClose}
        isAuthPopupOpen={isAuthPopupOpen}
        isRegPopupOpen={isRegPopupOpen}
        isInfoPopupOpen={isInfoPopupOpen}
      />
      <SearchForm
        onSetIsLoading={onSetIsLoading}
        onSetIsNotFoundResult={onSetIsNotFoundResult}
        onSetIsResult={onSetIsResult}
        onSetArticles={onSetArticles}
      />
      {isResult && (
        <NewsCardList
          loggedIn={loggedIn}
          isSavedPath={isSavedPath}
          articles={articles}
          onSetArticles={onSetArticles}
        />
      )}
      {isLoading && <Preloader />}
      {isNotFoundResult && <NotFoundResult
        isSavedPath={isSavedPath} />}
      <About />
    </>

  );
}

export default Main;
