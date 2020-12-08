import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import SavedNews from './SavedNews';
import SearchNews from './SearchNews';

function Main({
  currentUser,
  loggedIn,
  signOut,
  closeAllPopups,
  onSetIsLoading,
  onSetIsNotFoundResult,
  onSetIsResult,
  onSetArticles,
  isLoading,
  isNotFoundResult,
  isResult,
  articles,
  isBurgerOpen,
  handleBurgerOpen,
  handleAuthPopupOpen,
  isAuthPopupOpen,
  isRegPopupOpen,
  isInfoPopupOpen,
  savedArticles,
  isSavedPath,
  handleSaveArticles,
  handleDeleteArticles
}
) {

  return (
    <>
     <ProtectedRoute
        path="/saved-news"
        loggedIn={loggedIn}
        component={SavedNews}
        currentUser={currentUser}
        signOut={signOut}

        onSetArticles={onSetArticles}

        isBurgerOpen={isBurgerOpen}
        onBurgerOpen={handleBurgerOpen}
        onClose={closeAllPopups}

        isSavedPath={isSavedPath}
        savedArticles={savedArticles}

        handleSaveArticles={handleSaveArticles}
        handleDeleteArticles={handleDeleteArticles}
      />
      <Route exact path="/">
          <SearchNews
            currentUser={currentUser}
            loggedIn={loggedIn}
            signOut={signOut}
            onClose={closeAllPopups}

            onSetIsLoading={onSetIsLoading}
            onSetIsNotFoundResult={onSetIsNotFoundResult}
            onSetIsResult={onSetIsResult}
            onSetArticles={onSetArticles}

            isLoading={isLoading}
            isNotFoundResult={isNotFoundResult}
            isResult={isResult}
            articles={articles}

            isBurgerOpen={isBurgerOpen}
            onBurgerOpen={handleBurgerOpen}

            onAuthPopupOpen={handleAuthPopupOpen}
            isAuthPopupOpen={isAuthPopupOpen}
            isRegPopupOpen={isRegPopupOpen}
            isInfoPopupOpen={isInfoPopupOpen}

            savedArticles={savedArticles}
            handleSaveArticles={handleSaveArticles}
            handleDeleteArticles={handleDeleteArticles}

          />
      </Route>
    </>

  );
}

export default Main;
